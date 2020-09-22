import {Collections} from "../config/dbSettings.config";
import {runTransaction} from '../db/dbClient.js'

exports.likeUser = async (req, res) => {

    try{        

        const userReq = getUserFromReq(req.body);

        if(Object.keys(userReq).length === 0 && userReq.constructor === Object)
            res.status(404).json({ message:"No valid user email on request."});   

        else if(userReq.validationErrorMessage)
            return res.status(404).json({ message:userReq.validationErrorMessage});   

        const transactionResult = await runTransaction(async (db,opts) => {
            
            const otherUser= await db.collection(Collections.Users).findOne({email:userReq.email}, opts);

            if(!otherUser)
                return {errorCode:404, errorMessage:"User not found."};

            const userChoices= await db.collection(Collections.UsersChoices).findOne({email:req.email}, opts);

            if(!userChoices)
                return {errorCode:404, errorMessage:"User choices not found."};

            userChoices.likedUsers.push(userReq);
            const newValues = { $set: {"likedUsers":userChoices.likedUsers} };

            await db.collection(Collections.UsersChoices).updateOne({"_id": userChoices._id}, newValues, opts )

            const otherUserChoices= await db.collection(Collections.UsersChoices).findOne({email:userReq.email}, opts);

            if(!otherUserChoices)
                return {errorCode:404, errorMessage:"User choices not found."};

            //Check if there is a match. If so, insertIt
            if(otherUserChoices.likedUsers.find(likedUser=>likedUser.email == req.email)){
                await db.collection(Collections.UsersMatches).insertOne(
                    {
                        emails:[req.email,
                        userReq.email],
                        messages:[]
                    }, {}, opts);
                    return {match : {email: userReq.email}};
            }
        }); 
        
        if(transactionResult && transactionResult.errorCode)
            return res.status(transactionResult.errorCode).json({ message:transactionResult.errorMessage});

        if(transactionResult)
            return res.status(200).json(transactionResult);

        else
        return res.status(200).send();
    }catch(error){
        console.log(error);
        res.status(500).json({ message: error });
        return;
    }

}

exports.dislikeUser = async (req, res) => {

   try{

        const userReq = getUserFromReq(req.body);

        if(Object.keys(userReq).length === 0 && userReq.constructor === Object)
            res.status(404).json({ message:"No valid user email on request."});   

        else if(userReq.validationErrorMessage)
            return res.status(404).json({ message:userReq.validationErrorMessage});   

        const transactionResult = await runTransaction(async (db,opts) => {

            const otherUser= await db.collection(Collections.Users).findOne({email:userReq.email}, opts);

            if(!otherUser)
                return {errorCode:404, errorMessage:"User not found."};

            const userChoices= await db.collection(Collections.UsersChoices).findOne({email:req.email}, opts);

            if(!userChoices)
                return {errorCode:404, errorMessage:"User choices not found."};

            userChoices.dislikedUsers.push(userReq);

            const newValues = { $set: {"dislikedUsers":userChoices.dislikedUsers} };

            await db.collection(Collections.UsersChoices).updateOne({"_id": userChoices._id}, newValues, opts )

        });

        if(transactionResult && transactionResult.errorCode)
            return res.status(transactionResult.errorCode).json({ message:transactionResult.errorMessage});

        return res.status(200).send();

    }catch(error){        
        console.log(error);
        res.status(500).json({ message: error });
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