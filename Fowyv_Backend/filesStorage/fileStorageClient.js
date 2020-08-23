import fs from 'fs';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'AKIAJGFLMRUXDLELFR5Q',//process.env.AWS_ACCESS_KEY,
  secretAccessKey: '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'//process.env.AWS_SECRET_ACCESS_KEY
});

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

const downloadFile = (filename)=>{
    
    var options = {
        Bucket    : 'fowyvps1920v',
        Key    : filename,
    };
    
    let fileStream = s3.getObject(options).createReadStream();
    
    var file = fs.createWriteStream('C:\\Users\\User01\\Desktop\\Work\\Workspace\\ISEL\\PS\\1920v\\PS_1920v-Fowyv\\Fowyv_Backend\\filesStorage\\'+filename);
    fileStream.pipe(file);
    return file;
};

const deleteTmpFile = (filename)=>{
   fs.unlinkSync('C:\\Users\\User01\\Desktop\\Work\\Workspace\\ISEL\\PS\\1920v\\PS_1920v-Fowyv\\Fowyv_Backend\\filesStorage\\'+filename);
};


export {
    uploadFile,
    downloadFile,
    deleteTmpFile
}