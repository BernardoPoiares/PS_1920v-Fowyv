import {Collections} from "../config/dbSettings.config";
import appSettings from "../config/appSettings.config";
import {runQuery, runTransaction} from '../db/dbClient.js'
import {uploadFile} from "../filesStorage/fileStorageClient";

const { v4: uuidv4 } = require('uuid');

exports.getDetails = async (req, res) => {

    try{

        const details = await runQuery(async (db,opts) => {
    
            return await db.collection(Collections.UsersDetails).findOne({email: req.email}, opts);
    
        });
    
        if(!details)
            return res.status(404).send({ message: "User not found." });
    
        res.status(200).json(details);
    
      }catch(error){
        res.status(500).send({ message: error });
        return;
      }

}

exports.saveDetails = async (req, res) => {

    try{

        const detailsValuesReq = getDetailsValuesFromReq(req.body);

        if(Object.keys(detailsValuesReq).length === 0 && detailsValuesReq.constructor === Object)
            res.status(404).send("No valid search settings on request.");   

        else if(searchSettingsReq.validationErrorMessage)
            return res.status(404).send(searchSettingsReq.validationErrorMessage);   

        const transactionResult = await runTransaction(async (db,opts) => {
            
            const collection = db.collection(Collections.UsersDetails);

            let userDetails= await collection.findOne({email:req.email}, {...opts, projection : { _id : 0 }});

            if(!userDetails)
                return {errorCode:404, errorMessage:"User details not found."};
                
            Object.assign(userDetails,detailsValuesReq);
            
            const {_id,...newDetails}= userDetails
            const newValues = { $set: {...newDetails} };
            await collection.updateOne({"_id": _id}, newValues, opts );
        });

        if(transactionResult && transactionResult.errorCode)
            return res.status(transactionResult.errorCode).send(transactionResult.errorMessage);

        res.status(200).send();

      }catch(error){
        res.status(500).send({ message: error });
        return;
      }
    
}

exports.setProfile = async (req, res) => {
    
    try{
        
        const profileValuesReq = getProfileValuesFromReq(req.body);

        if(Object.keys(profileValuesReq).length === 0 && profileValuesReq.constructor === Object)
            res.status(404).send("No valid profile values on request.");   

        else if(profileValuesReq.validationErrorMessage)
            return res.status(404).send(profileValuesReq.validationErrorMessage);   

        const filename = uuidv4()+'.'+profileValuesReq.fileType;
        const content = Buffer.from(req.body.content, 'base64');

        uploadFile(filename,content, async (error)=>{
            if (error) {
                console.log(error);
                return res.status(404).send("Error uploading file");   
            }else {   
                await runTransaction(async (db,opts) => {
                    
                    const usersDetailsCollection = db.collection(Collections.UsersDetails);

                    let userDetails= await usersDetailsCollection.findOne({email:req.email}, opts);

                    if(!userDetails){
                        userDetails = { 
                            email:req.email,
                            name:profileValuesReq.name,
                            gender:profileValuesReq.gender,
                            age:profileValuesReq.date,
                            icon:profileValuesReq.icon,
                            audioFile:filename,
                        };
                        await usersDetailsCollection.insertOne(userDetails, {}, opts);
                    }else{
                        ({...userDetails} = profileValuesReq);
                        await usersDetailsCollection.replaceOne({email:userDetails.email}, userDetails, opts);
                    }
                }); 
                res.type('json');
                res.status(200).json({audioFile:filename});
            }
        });

      }catch(error){
        console.log(error)
        res.status(500).send({ message: error });
        return;
      }
    
}

const getProfileValuesFromReq= (req) =>{
    let ret = getDetailsValuesFromReq(req);

    if(!ret.validationErrorMessage){
        if(req.gender){
            if(!appSettings.genders.includes(req.gender)){
                ret.validationErrorMessage = "Gender not valid."
            }else{
                ret.gender = req.gender;
            }
        }else{
            ret.validationErrorMessage = "Gender not Found."
            return ret;
        }
        if(req.fileType){
            ret.fileType = req.fileType;
        }else{
            ret.validationErrorMessage = "FileType not Found."
            return ret;
        }if(!req.content){
            ret.validationErrorMessage = "Content not found."
            return ret;
        }
    }

    return ret;
}

const getDetailsValuesFromReq= (req) => {

    let ret={};

    if(req.date){
        if(!(Date.parse(req.date))){
            ret.validationErrorMessage = "Age must be Date."
            return ret;
        }
        if(GetAge(req.date) < appSettings.minSearchAge){
            ret.validationErrorMessage = `Age passed is minor then minimum age allowed (${appSettings.minSearchAge} years old) to use this application.`
            return ret;
        }

        ret.date=req.date;
    }
    if(req.name)
        ret.name=req.name;

    return ret;
}

const GetAge=(dateString)=>{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  