import {GetAge} from '../utils/dates';


exports.getSearchSettings = (req, res) => {

    try{

        const searchSettings = await runTransaction(async (db,opts) => {

            const userSearchSettings= await db.collection("UserSearchSettings").findOne({email:req.email}, opts);

            if(!userSearchSettings)
                throw new Error("User Not found.");

            return userSearchSettings;

        }); 

        return res.status(200).json(searchSettings);

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}

exports.setSearchSettings = (req, res) => {
    
    try{

        const searchSettings = await runTransaction(async (db,opts) => {

            const collection = db.collection("UsersSearchSettings");

            let userSearchSettings= await collection.findOne({email:req.email}, opts);

            if(!userSearchSettings)
                throw new Error("User Not found.");

            Object.assign(userSearchSettings,req.body);
            
            await collection.replaceOne(({email:userSearchSettings.email}, userSearchSettings, options));

        }); 

        res.status(200).send();

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}

exports.searchUsers = (req, res) => {
    
    try{
        
        const searchResult = await runTransaction(async (db,opts) => {

            const userSearchSettings= await  db.collection("UsersSearchSettings").findOne({email:req.email}, opts);

            if(!userSearchSettings)
                throw new Error("User Not found.");

            const userChoices= await  db.collection("UsersChoices").findOne({email:req.email}, opts);

            if(!userChoices)
                throw new Error("User Not found.");

            let usersSearchResult = dbo.collection("UsersDetails").find(user => user.email != req.email).toArray();

            if(!usersSearchResult)
                usersSearchResult = usersSearchResult.filter(user => 
                    userChoices.dislikedUsers.find(userDis=>userDis.email == user.email) == undefined 
                    && userChoices.likedUsers.find(userlik=>userlik.email == user.email) == undefined  
                    && GetAge(user.age)>=userSearchSettings.minSearchAge 
                    && GetAge(user.age)<=userSearchSettings.maxSearchAge
                    && userSearchSettings.searchGenders.includes(user.gender))
                
            return usersSearchResult;
        }); 

        res.status(200).send(searchResult);

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}