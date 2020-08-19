

exports.getMatches = (req, res) => {

    try{
        
        const matchesDetails = await runTransaction(async (db,opts) => {

            const userMatches = await db.collection("UsersMatches").findOne({email:req.email}, opts);

            if(!userMatches)
                throw new Error("User Not found.");

            return await db.collection("UsersDetails")
                .find(u => u.email != req.email)
                .filter(u =>u.email != req.email)
                .filter( user => matches
                        .some( match => match.emails.includes(user.email) )
                );

        }); 

        res.status(200).json(matchesDetails);

    }catch(error){
        res.status(500).send({ message: error });
        return;
    }
    
}
