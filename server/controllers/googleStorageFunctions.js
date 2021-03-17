// ES Modules in Node >= 14 no longer have require by default.
// If you want to add it, put this code at the top of your file:
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
////////

const {Storage} = require('@google-cloud/storage');

import axios from 'axios';

import express from 'express';

const storage = new Storage({ keyFilename: 'key.json'});

const router = express.Router();



async function configureBucketCors() {
    /**
     * Used once to configure CORS for Cloud Storage Bucket from the app.
     */
    const bucketName =  process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME;
    const maxAgeSeconds = 3600; //3600 seconds = 1 hour
    const method = ["POST", "GET", "PUT", "DELETE", "OPTIONS"]
    const origin = ["*"];
    const responseHeader = ["Content-Type", "Access-Control-Allow-Origin", "x-goog-resumable"];

    await storage.bucket(bucketName).setCorsConfiguration([
      {
        maxAgeSeconds,
        method: method,
        origin: origin,
        responseHeader: responseHeader,
      },
    ]);
  
    console.log(`Bucket ${bucketName} was updated with a CORS config
        to allow ${method} requests from ${origin} sharing 
        ${responseHeader} responses across origins`);
}

export const deleteFileFromCloudStorage = async (req, res) => {
    const deletionData = req.body;

    try {
        const url = process.env.GCLOUD_DELETE_FUNCTION_URL;
        // post deletionData to GCloud(GCloud uses data to decide what to delete)
        await axios.post(url, deletionData); 
    } catch (error) {
        console.log(error);
    }
}


export const generateV4UploadSignedUrl = async (req, res) => {
    // These options will allow temporary uploading of the file with outgoing
    // Content-Type: application/octet-stream header.

    const { fileName, ID} = req.body;
    const filename = `${ID}--${fileName}`;

    const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME;

    try {
        const options = {
            version: 'v4',
            action: 'write',
            expires: Date.now() + 10 * 60 * 1000,  // 10 minutes
            contentType: 'application/octet-stream',
        };
    
        const [url] = await storage
            .bucket(bucketName)
            .file(filename)
            .getSignedUrl(options);
        
    
        // console.log('Generated PUT signed URL:');
        // console.log("url type: " + typeof(url))
        // console.log(url);
        // console.log('You can use this URL with any user agent, for example:');
        // console.log(
        //     "curl -X PUT -H 'Content-Type: application/octet-stream' " +
        //     `--upload-file my-file '${url}'`
        // );

        res.send(url);

    } catch (error) {
        console.log(error);
    }
}


export const generateV4ReadSignedUrl = async (req, res) => {

    const { filename } = req.body;
    const bucketName = process.env.GCLOUD_VISION_API_OUTPUT_BUCKET_NAME;

    try {
        // These options will allow temporary read access to the file
        const options = {
            version: 'v4',
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        };
        
        // Get a v4 signed URL for reading the file
        const [url] = await storage
        .bucket(bucketName)
        .file(filename)
        .getSignedUrl(options);
        
        // console.log('Generated GET signed URL:');
        // console.log(url);
        // console.log('You can use this URL with any user agent, for example:');
        // console.log(`curl '${url}'`);

        res.send(url);
    } catch (error) {
        console.log(error);
    }
}

export default router;