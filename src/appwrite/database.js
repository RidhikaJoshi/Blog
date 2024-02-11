import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client
			.setEndpoint(config.appwriteURL)
			.setProject(config.appwriteProjectId);

		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}
	// this mthod handles to create any new post
	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log("Appwrite createPost error", error);
		}
	}
	// this method handles to update any existing post
	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.log("Appwrite updatePost error", error);
		}
	}

	// this method is to delete the corresponding post
	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log("Appwrite deletePost error", error);
		}
		return false;
	}

	// this method is used to fetch any post by its slug
	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log("Appwrite getPost error", error);
		}
		return false;
	}

	// this method is used to fecth all the posts
	async getAllPosts() {
		try {
			return await this.databases.listDocuments(
				config.appwriteDatabaseId,
				config.appwriteCollectionId,
				[Query.equal("status", "active")]
			);
		} catch (error) {
			console.log("Appwrite getAllPosts error", error);
		}
		return false;
	}

	// this method is used to upload any file to the appwrite storage
	async uploadFile(file) {
		// console.log(file);
		// console.log(config.appwriteBucketId);

		try {
			const response = await this.storage.createFile(
				config.appwriteBucketId,
				ID.unique(),
				file
			);
			return response;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	// this method is used to delete any file from the appwrite storage
	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(config.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Appwrite deleteFile error", error);
		}
		return false;
	}

	//  THIS METHOD IS USED FOR GEETING FILE PREVIEW
	async getfilepreviw(fileId) {
		try {
			return await this.bucket.getFilePreview(config.appwriteBucketId, fileId);
		} catch (error) {
			console.log("Appwrite getfilepreviw error", error);
		}
		return false;
	}
}

const service = new DatabaseService();
export default service;
