


exports.likeUser = (req, res) => {

    try{

        await runTransaction(async (db,opts) => {

            const userChoices= await db.collection("UsersChoices").findOne({email:req.email}, opts);

            if(!userChoices)
                throw new Error("User Not found.");

            userChoices.likedUsers.push(req.body);
            const newValues = { $set: {likedUsers:userChoices.likedUsers} };

            await db.collection("UsersChoices").updateOne({email:userChoices.email}, newValues, opts )

            const otherUserChoices= await db.collection("UsersChoices").findOne({email:req.body.email}, opts);

            if(!otherUserChoices)
                throw new Error("User Not found.");

            //Check if there is a match. If so, insertIt
            if(otherUserChoices.likedUsers.find(likedUser=>likedUser.email == req.email))
                await db.collection('UsersMatches').insertOne(
                    {
                        emails:[req.email,
                        req.body.email],
                        historic:[]
                    }, {}, opts);

        }); 

        return res.status(200).send();

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}

exports.dislikeUser = (req, res) => {

   try{

        await runTransaction(async (db,opts) => {

            const userChoices= await db.collection("UsersChoices").findOne({email:req.email}, opts);

            if(!userChoices)
                throw new Error("User Not found.");

            userChoices.dislikedUsers.push(req.body);
            const newValues = { $set: {dislikedUsers:userChoices.dislikedUsers} };

            await db.collection("UsersChoices").updateOne({email:userChoices.email}, newValues, opts )

        });

        return res.status(200).send();

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }

}