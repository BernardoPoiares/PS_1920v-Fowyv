import {Collections} from "../config/dbSettings.config";
import {runTransaction} from '../db/dbClient.js'

exports.getMatches = async (req, res) => {

    try{
        
        const matchesDetails = await runTransaction(async (db,opts) => {

            const userMatches = await db.collection(Collections.UserMatches).findOne({email:req.email}, opts);

            if(!userMatches)
                return {errorCode:404, errorMessage:"User matches not found."};


            return await db.collection(Collections.UserDetails)
                .find(u => u.email != req.email)
                .filter(u =>u.email != req.email)
                .filter( user => matches
                        .some( match => match.emails.includes(user.email) )
                );

        }); 

        if(matchesDetails && matchesDetails.errorCode)
            return res.status(matchesDetails.errorCode).send(matchesDetails.errorMessage);

        res.status(200).json(matchesDetails);

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }
    
}
