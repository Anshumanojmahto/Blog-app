import conf from "../conf/conf.js";
import { Client, Databases, Query } from "appwrite";

export class AppServices {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    this.database = new Databases(this.client);
  }

  async createPost({ title, slug, content, featureimg, status, userid }) {
    try {
      const newDocument = await this.database.createDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        { title, content, featureimg, status, userid } // data
      );
      console.log(newDocument);

      return newDocument;
    } catch (error) {
      console.log("error in :: AppService :: createPost", error);
    }
  }
  async updatePost(slug, { title, content, featureimg, status }) {
    try {
      const result = await this.database.updateDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug, // documentId
        { title, content, featureimg, status } // data (optional)
      );
      return result;
    } catch (error) {
      console.log("error in :: AppService :: updatePost", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug
      );
      return true;
    } catch (error) {
      console.log("error in :: AppService :: deletePost", error);
      return flase;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const allDocs = await this.database.listDocuments(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId,
        queries
      );
      return allDocs;
    } catch (error) {
      console.log("error in :: AppService :: getPosts", error);
    }
    return null;
  }

  async getPost(slug) {
    try {
      const result = await this.database.getDocument(
        conf.appwriteDatabaseId, // databaseId
        conf.appwriteCollectionId, // collectionId
        slug // documentId
      );
      return result;
    } catch (error) {
      console.log("error in :: AppService :: getPost", error);
      return false;
    }
  }
}

const appServices = new AppServices();

export default appServices;
