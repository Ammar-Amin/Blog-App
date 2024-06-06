import config from '../config/config'
import { Client, Databases, Query } from 'appwrite';

export class PostService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createPost({ title, slug, content, featuredImg, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImg,
                    status,
                    userId
                } // data
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error :", error);
        }
    }

    async updatePost(slug, { title, content, featuredImg, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImg,
                    status
                }, // data (optional)
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error :", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error :", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error :", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                queries, // queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error :", error);
            return false;
        }
    }

}

const postService = new PostService();

export default postService