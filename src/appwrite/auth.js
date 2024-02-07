import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();

	constructor() {
		this.client
			.setEndpoint(config.appwriteURL)
			.setProject(config.appwriteProjectId);

		this.account = new Account(this.client);
	}
	// this mthod is used for sign up
	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				// call another method
				// if account is created successfully then  login into app
				return this.login(email, password);
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}
	// this method is used for login
	async login(email, password) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}
	// this method is used to get current user info
	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			throw error;
		}
		return null;
	}
	// this method is for the logout
	async logout() {
		try {
			return await this.account.deleteSessions();
			// used to delete all the sessions of the current user
		} catch (error) {
			throw error;
		}
	}
}
const authService = new AuthService();
export default authService;
