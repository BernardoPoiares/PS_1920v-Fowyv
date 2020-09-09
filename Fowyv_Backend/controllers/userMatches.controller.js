import {Collections} from "../config/dbSettings.config";
import {runQuery, runTransaction} from '../db/dbClient.js'

exports.getMatches = async (req, res) => {

    try{
        
        const matchesDetails = await runTransaction(async (db,opts) => {

            const userMatches = await db.collection(Collections.UsersMatches).find({emails: req.email }, opts).toArray();

            if(!userMatches)
                return {errorCode:404, errorMessage:"User matches not found."};


            const usersDetails = await db.collection(Collections.UsersDetails).find({ email: { $ne : req.email } },opts).toArray();

            if(usersDetails)
                return usersDetails.filter( user => userMatches
                        .some( match => match.emails.includes(user.email) )
                );

            return usersDetails;

        }); 

        if(matchesDetails && matchesDetails.errorCode)
            return res.status(matchesDetails.errorCode).send(matchesDetails.errorMessage);

        res.status(200).json(matchesDetails);

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }
    
}

exports.deleteMatch = async (req, res) => {

    try{
        const userMatch = getUserFromReq(req.body);

        if(Object.keys(userMatch).length === 0 && userMatch.constructor === Object)
            return res.status(404).send("No valid email on request.");   

        const matchesDetails = await runQuery(async (db,opts) => {

            await db.collection(Collections.UsersMatches).deleteOne({ emails: { $all:[req.email,userMatch.email]}}, opts);

        }); 

        if(matchesDetails && matchesDetails.errorCode)
            return res.status(matchesDetails.errorCode).send(matchesDetails.errorMessage);

        res.status(200).send();

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }
    
}


const getUserFromReq= (req) => {

    let ret={};

    if(req.email){
        ret.email=req.email;
    }

    return ret;
}