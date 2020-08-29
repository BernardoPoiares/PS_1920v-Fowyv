import fs from 'fs';
import AWS from 'aws-sdk';
import tmp from 'tmp';
//const fs = require( 'fs');
//const AWS =require( 'aws-sdk');
//const tmp =require( 'tmp');


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const directory = tmp.dirSync();
console.log('Dir: ', directory);

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
    

    /*
    let fileStream = s3.getObject(options).createReadStream();
    const path= directory.name+'/'+filename;
    var file = fs.createWriteStream(path);
    fileStream.pipe(file);
    
    fileStream.on("finish", ()=>{
        fs.readFile(directory.name+'/'+filename,
                cb);
    });*/
    return await new Promise( (resolve)=>{

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
    )

};

const deleteTmpFile = (filename)=>{
   fs.unlinkSync(directory.name+'/'+filename);
};


export {
    uploadFile,
    downloadFile,
    deleteTmpFile
}