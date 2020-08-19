

exports.getDetails = (req, res) => {

    try{

        const details = await runTransaction(async (db,opts) => {
    
            return await db.collection('UsersDetails').findOne({email: req.email}, {}, opts);
    
        });
    
        if(!details)
            return res.status(404).send({ message: "User Not found." });
    
        res.status(200).json(details);
    
      }catch(error){
        res.status(500).send({ message: error });
        return;
      }

}

exports.saveDetails = (req, res) => {

    try{

        await runTransaction(async (db,opts) => {
            
            const collection = db.collection("UsersDetails");

            let userDetails= await collection.findOne({email:req.email}, opts);

            if(!userDetails)
                throw new Error("User Not found.");

            Object.assign(userDetails,req.body);
            
            await collection.replaceOne(({email:userDetails.email}, userDetails, options));
        });

        res.status(200).send();

      }catch(error){
        res.status(500).send({ message: error });
        return;
      }
    
}

exports.setProfile = (req, res) => {
    
    try{

        await runTransaction(async (db,opts) => {
            
            const usersDetailsCollection = db.collection("UsersDetails");

            let userDetails= await usersDetailsCollection.findOne({email:req.email}, opts);

            if(!userDetails){
                userDetails = { 
                    email:req.email,
                    name:req.body.name,
                    gender:"female",
                    age:req.body.date,
                    icon:req.body.icon
                };
                await usersDetailsCollection.insertOne(userDetails, {}, opts);
            }else{
                ({...userDetails} = req.body);
                await usersDetailsCollection.replaceOne(({email:userDetails.email}, userDetails, options));
            }

            const audioFilesCollection = db.collection("AudioFiles");

            let audioFile= await audioFilesCollection.findOne({email:req.email}, opts);

            if(!audioFile){
                audioFile = { email:req.email, language:null, path:null};
                ({...audioFile} = req.body.audioFile);
                AudioFiles.push(audioFile);
                await audioFilesCollection.insertOne(audioFile, {}, opts);
            }else{
                ({...audioFile} = req.body.audioFile);
                await audioFilesCollection.replaceOne(({email:userDetails.email}, audioFile, options));
            }
        
        });

        res.status(200).send();

      }catch(error){
        res.status(500).send({ message: error });
        return;
      }
    
}
