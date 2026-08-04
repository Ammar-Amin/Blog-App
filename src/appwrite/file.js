import config from '../config/config'
import { Client, ID, Storage } from 'appwrite';

export class FileService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.storage = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId, // bucketId
                ID.unique(), // fileId
                file, // file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error :" + error)
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId, // bucketId
                fileId // fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error :" + error)
            return false;
        }
    }

    // Use getFileView (raw file) not getFilePreview: image transformations
    // are a paid Appwrite Cloud feature and 403 on the free plan.
    getFileView(fileId) {
        return this.storage.getFileView(
            config.appwriteBucketId, // bucketId
            fileId // fileId
        )
    }

}

const fileService = new FileService();

export default fileService