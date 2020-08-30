import fs from 'fs';
import AWS from 'aws-sdk';

//const fs = require( 'fs');
//const AWS =require( 'aws-sdk');


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = (filename, fileContent, cb ) => {
    // Read content from the file
    //const fileContent = fs.readFileSync(filepath);

    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: filename, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        cb(err);
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

const downloadFile = async (filename,cb)=>{
    
    var options = {
        Bucket    : process.env.AWS_BUCKET,
        Key    : filename,
    };

    s3.getObject(options,(error,data)=>{
        if(error)
            return cb(error.message);
        cb(null,data.Body);
    })
    
    /*return await new Promise( (resolve)=>{

        var options = {
            Bucket    : process.env.AWS_BUCKET,
            Key    : filename,
        };

        s3.getObject(options,(error,data)=>{
            if(error)
                return resolve({error:'Error getting the file'});
            resolve({fileData:data.Body});
        })
        }
    )*/

};

export {
    uploadFile,
    downloadFile
}