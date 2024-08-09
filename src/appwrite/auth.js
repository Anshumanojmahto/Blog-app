import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  async signUp({ email, password, name }) {
    try {
      const newAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (newAccount) {
        return this.login({ email, password });
      } else {
        return newAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error in login :: appwrite ", error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser :: error", error);
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Error in logout :: appwrite ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
