import {Collections} from "../config/dbSettings.config";
import {runTransaction} from '../db/dbClient.js'

exports.likeUser = (req, res) => {

    try{

        const transactionResult = await runTransaction(async (db,opts) => {

            const userChoices= await db.collection(Collections.UsersChoices).findOne({email:req.email}, opts);

            if(!userChoices)
                return {errorCode:404, errorMessage:"User choices not found."};

            userChoices.likedUsers.push(req.body);
            const newValues = { $set: {likedUsers:userChoices.likedUsers} };

            await db.collection(Collections.UsersChoices).updateOne({email:userChoices.email}, newValues, opts )

            const otherUserChoices= await db.collection(Collections.UsersChoices).findOne({email:req.body.email}, opts);

            if(!otherUserChoices)
                return {errorCode:404, errorMessage:"User choices not found."};

            //Check if there is a match. If so, insertIt
            if(otherUserChoices.likedUsers.find(likedUser=>likedUser.email == req.email))
                await db.collection(Collections.UsersMatches).insertOne(
                    {
                        emails:[req.email,
                        req.body.email],
                        historic:[]
                    }, {}, opts);

        }); 
        
        if(transactionResult.errorCode)
            return res.status(transactionResult.errorCode).send(transactionResult.errorMessage);

        return res.status(200).send();

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}

exports.dislikeUser = (req, res) => {

   try{

        const transactionResult = await runTransaction(async (db,opts) => {

            const userChoices= await db.collection(UsersMatches.userChoices).findOne({email:req.email}, opts);

            if(!userChoices)
                return {errorCode:404, errorMessage:"User matches not found."};

            userChoices.dislikedUsers.push(req.body);

            const newValues = { $set: {dislikedUsers:userChoices.dislikedUsers} };

            await db.collection(UsersMatches.UserChoices).updateOne({email:userChoices.email}, newValues, opts )

        });

        if(transactionResult && transactionResult.errorCode)
            return res.status(transactionResult.errorCode).send(transactionResult.errorMessage);

        return res.status(200).send();

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}