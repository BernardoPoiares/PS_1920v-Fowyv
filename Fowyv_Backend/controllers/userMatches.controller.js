import {Collections} from "../config/dbSettings.config";
import {runTransaction} from '../db/dbClient.js'

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