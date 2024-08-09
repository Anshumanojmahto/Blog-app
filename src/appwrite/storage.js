import { Client, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class StorageService {
  client = new Client();
  storage;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    this.storage = new Storage(this.client);
  }
  async uploadFile(file) {
    try {
      const result = await this.storage.createFile(
        conf.appwriteBucketId,
        //edit
        ID.unique(), // fileId
        file
      );
      return result;
    } catch (error) {
      console.log("error in :: Storage :: uploadFile", error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(
        conf.appwriteBucketId, // bucketId
        fileId // fileId
      );
      return true;
    } catch (error) {
      console.log("error in :: Storage :: createFile", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
