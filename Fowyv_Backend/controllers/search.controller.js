import {Collections} from "../config/dbSettings.config";
import appSettings from "../config/appSettings.config";
import {runTransaction} from '../db/dbClient.js'

import {GetAge} from '../utils/dates';


exports.getSearchSettings = async (req, res) => {

    try{

        const searchSettings = await runTransaction(async (db,opts) => {

            const userSearchSettings= await db.collection(Collections.UsersSearchSettings).findOne({email:req.email}, opts);

            if(!userSearchSettings)
                return {errorCode:404, errorMessage:"User not found."};

            return userSearchSettings;

        }); 
        
        if(searchSettings && searchSettings.errorCode)
            return res.status(searchSettings.errorCode).send(searchSettings.errorMessage);

        return res.status(200).json(searchSettings);

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}

exports.setSearchSettings = async (req, res) => {
    
    try{

        const searchSettingsReq = getSearchSettingsFromReq(req.body);

        if(Object.keys(searchSettingsReq).length === 0 && searchSettingsReq.constructor === Object)
            return res.status(404).send("No valid search settings on request.");  

        else if(searchSettingsReq.validationErrorMessage)
            return res.status(404).send(searchSettingsReq.validationErrorMessage);   

        const transactionReturn = await runTransaction(async (db,opts) => {

            const collection = db.collection(Collections.UsersSearchSettings);

            let userSearchSettings= await collection.findOne({email:req.email},opts);

            if(!userSearchSettings)
                return {errorCode:404, errorMessage:"No search settings for user."};

            Object.assign(userSearchSettings,searchSettingsReq);
            
            const [_id,...newSettings]= userSearchSettings
            const newValues = { $set: {...newSettings} };
            console.log(_id);
            await collection.updateOne(({"_id": _id},{email:userSearchSettings.email}, newValues, opts));

        }); 

        if(transactionReturn.errorCode)
            return res.status(transactionReturn.errorCode).send(transactionReturn.errorMessage);

        res.status(200).send();

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}

exports.searchUsers = async (req, res) => {
    
    try{
        
        const searchResult = await runTransaction(async (db,opts) => {

            const userSearchSettings= await  db.collection(Collections.UsersSearchSettings).findOne({email:req.email}, opts);

            if(!userSearchSettings)
                return {errorCode:404, errorMessage:"No user found."};

            const userChoices= await  db.collection(Collections.UsersChoices).findOne({email:req.email}, opts);

            if(!userChoices)
                return {errorCode:404, errorMessage:"No userChoices found."};

            const query = { email: { $ne : req.email } };

            let usersSearchResult = await db.collection(Collections.UsersDetails).find(query).toArray();

            if(!usersSearchResult)
                usersSearchResult = usersSearchResult.filter(user => 
                    userChoices.dislikedUsers.find(userDis=>userDis.email == user.email) == undefined 
                    && userChoices.likedUsers.find(userlik=>userlik.email == user.email) == undefined  
                    && GetAge(user.age)>=userSearchSettings.minSearchAge 
                    && GetAge(user.age)<=userSearchSettings.maxSearchAge
                    && userSearchSettings.searchGenders.includes(user.gender))
                
            return usersSearchResult;
        }); 


        if(searchResult.errorCode)
            return res.status(searchResult.errorCode).send(searchResult.errorMessage);


        res.status(200).send(searchResult);

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}

const getSearchSettingsFromReq= (req) =>{
    let ret={};

    if(req.minSearchAge){ 
        if(!Number.isInteger(req.minSearchAge)){
            ret.validationErrorMessage = "Minimum search age must be number."
            return ret;
        }
        if(req.minSearchAge<appSettings.minSearchAge){
            ret.validationErrorMessage = `Minimum search age must be higher or equal then ${appSettings.minSearchAge}`
            return ret;
        }
        if(req.minSearchAge>appSettings.maxSearchAge){
            ret.validationErrorMessage = `Minimum search age must be lower or equal then ${appSettings.maxSearchAge}`
            return ret;
        }

        ret.minSearchAge=req.minSearchAge;
    }
    if(req.maxSearchAge){
        if(!Number.isInteger(req.maxSearchAge)){
            ret.validationErrorMessage = "Maximum search age must be number."
            return ret;
        }
        if(req.maxSearchAge<appSettings.minSearchAge){
            ret.validationErrorMessage = `Maximum search age must be higher or equal then ${appSettings.minSearchAge}.`
            return ret;
        }
        if(req.maxSearchAge>appSettings.maxSearchAge){
            ret.validationErrorMessage = `Maximum search age must be lower or equal then ${appSettings.maxSearchAge}.`
            return ret;
        }
    
        ret.maxSearchAge=req.maxSearchAge;
    }
    if(req.searchGenders){
        if(!Array.isArray(req.searchGenders)){
            ret.validationErrorMessage = "Search genders must be an array."
            return ret;
        }
        if(!req.searchGenders.every(gender=>appSettings.genders.includes(gender))){
            ret.validationErrorMessage = "Genders passed not valid."
            return ret;
        }

        ret.searchGenders=req.searchGenders;
    }
    if(req.languages){ 
        
        if(!Array.isArray(req.languages)){
            ret.validationErrorMessage = "Languages must be an array."
            return ret;
        }
        if(!req.languages.every(language=>appSettings.languages.includes(language))){
            ret.validationErrorMessage = "Languages passed not valid."
            return ret;
        }

        ret.languages=req.languages;
    
    }

    return ret;
}