import fs from 'fs';
import AWS from 'aws-sdk';
import tmp from 'tmp';
 


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const directory = tmp.dirSync();
console.log('Dir: ', directory);

const uploadFile = (filepath, filename) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filepath);

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
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

const downloadFile = (filename,cb)=>{
    
    var options = {
        Bucket    : process.env.AWS_BUCKET,
        Key    : filename,
    };
    
    let fileStream = s3.getObject(options).createReadStream();
    const path= directory.name+'/'+filename;
    var file = fs.createWriteStream(path);
    fileStream.pipe(file);
    
    fileStream.on("finish", ()=>{
        fs.readFile(directory.name+'/'+filename,(error,data)=>{
            const path2= directory.name+"/asad2.aac";

            var file2 = fs.writeFile(path2,data,(e)=>{
                console.log(e);
            });

            for (let i = 0; i < data.length; i++) {
                const num = data[i];
                const str = String.fromCharCode(num);
                fs.appendFileSync('./test1.aac', str, { encoding: 'ascii' });
              }
        });
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