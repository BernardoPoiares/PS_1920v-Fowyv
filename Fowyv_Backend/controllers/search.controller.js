import {Collections} from "../config/dbSettings.config";
import appSettings from "../config/appSettings.config";
import {runTransaction} from '../db/dbClient.js'

import {GetAge} from '../utils/dates';


exports.getSearchSettings = (req, res) => {

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

exports.setSearchSettings = (req, res) => {
    
    try{

        const searchSettingsReq = getSearchSettingsFromReq(req.body);

        if(Object.keys(searchSettingsReq).length === 0 && searchSettingsReq.constructor === Object)
            return res.status(404).send("No valid search settings on request.");  

        else if(searchSettingsReq.validationErrorMessage)
            return res.status(404).send(searchSettingsReq.validationErrorMessage);   

        const transactionReturn = await runTransaction(async (db,opts) => {

            const collection = db.collection(Collections.UsersSearchSettings);

            let userSearchSettings= await collection.findOne({email:req.email}, opts);

            if(!userSearchSettings)
                return {errorCode:404, errorMessage:"No search settings for user."};

            Object.assign(userSearchSettings,searchSettingsReq);
            
            await collection.replaceOne(({email:userSearchSettings.email}, userSearchSettings, options));

        }); 

        if(transactionReturn.errorCode)
            return res.status(transactionReturn.errorCode).send(transactionReturn.errorMessage);

        res.status(200).send();

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}

exports.searchUsers = (req, res) => {
    
    try{
        
        const searchResult = await runTransaction(async (db,opts) => {

            const userSearchSettings= await  db.collection(Collections.UsersSearchSettings).findOne({email:req.email}, opts);

            if(!userSearchSettings)
                return {errorCode:404, errorMessage:"No user found."};

            const userChoices= await  db.collection(Collections.UserChoices).findOne({email:req.email}, opts);

            if(!userChoices)
                return {errorCode:404, errorMessage:"No userChoices found."};

            let usersSearchResult = dbo.collection(Collections.UsersDetails).find(user => user.email != req.email).toArray();

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
        if(!Number.isInteger(req.minSearchAge))
            return ret.validationErrorMessage = "Minimum search age must be number."
        if(req.minSearchAge<appSettings.minSearchAge)
            return ret.validationErrorMessage = `Minimum search age must be higher or equal then ${appSettings.minSearchAge}`
        if(req.minSearchAge>appSettings.maxSearchAge)
            return ret.validationErrorMessage = `Minimum search age must be lower or equal then ${appSettings.maxSearchAge}`

        ret.minSearchAge=req.minSearchAge;
    }
    if(req.maxSearchAge){
        if(!Number.isInteger(req.maxSearchAge))
            return ret.validationErrorMessage = "Maximum search age must be number."
        if(req.maxSearchAge<appSettings.minSearchAge)
            return ret.validationErrorMessage = `Maximum search age must be higher or equal then ${appSettings.minSearchAge}.`
        if(req.maxSearchAge>appSettings.maxSearchAge)
            return ret.validationErrorMessage = `Maximum search age must be lower or equal then ${appSettings.maxSearchAge}.`
    
        ret.maxSearchAge=req.maxSearchAge;
    }
    if(req.searchGenders){
        if(!Array.isArray(req.searchGenders))
            return ret.validationErrorMessage = "Search genders must be an array."
        if(!req.searchGenders.every(gender=>appSettings.genders.includes(gender)))
            return ret.validationErrorMessage = "Genders passed not valid."

        ret.searchGenders=req.searchGenders;
    }
    if(req.languages){ 
        
        if(!Array.isArray(req.languages))
            return ret.validationErrorMessage = "Languages must be an array."
        if(!req.languages.every(language=>appSettings.languages.includes(language)))
            return ret.validationErrorMessage = "Languages passed not valid."

        ret.languages=req.languages;
    
    }

    return ret;
}