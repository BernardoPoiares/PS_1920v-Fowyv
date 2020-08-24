import fs from 'fs';
import AWS from 'aws-sdk';
import tmp from 'tmp';
 


const s3 = new AWS.S3({
  accessKeyId: 'AKIAJGFLMRUXDLELFR5Q',//process.env.AWS_ACCESS_KEY,
  secretAccessKey: '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'//process.env.AWS_SECRET_ACCESS_KEY
});

const directory = tmp.dirSync();
console.log('Dir: ', directory);

const uploadFile = (filepath, filename) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filepath);

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'fowyvps1920v',
        Key: filename, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

const downloadFile = (filename,cb)=>{
    
    var options = {
        Bucket    : 'fowyvps1920v',
        Key    : filename,
    };
    
    let fileStream = s3.getObject(options).createReadStream();
    
    var file = fs.createWriteStream(directory+filename);
    fileStream.pipe(file);
    
    fileStream.on("finish", ()=>{
        fs.readFile(directory+filename,cb);
    });

};

const deleteTmpFile = (filename)=>{
   fs.unlinkSync(directory+filename);
};


export {
    uploadFile,
    downloadFile,
    deleteTmpFile
}