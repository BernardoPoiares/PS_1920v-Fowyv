

exports.getDetails = (req, res) => {
    /*const user=UsersDetails.find(user=>
        user.email == req.email);
    if(!user)
        return res.status(404).send({ message: "User Not found." });
    return res.status(200).json(user);*/
    return res.status(200).send();
}

exports.saveDetails = (req, res) => {
    /*let user=UsersDetails.find(user=>user.email == req.email);
    if(!user)
        user={email:req.email}
    
    Object.assign(user,req.body);
    UsersDetails= UsersDetails.map(u=>u.email ==req.email? user:u);

        */
    res.status(200).send();
    
}

exports.setProfile = (req, res) => {
    /*let user=UsersDetails.find(
        user=>user.email == req.email);
    if(!user){
        user={email:req.email,name:req.body.name,gender:"female",age:req.body.date,icon:req.body.icon};
        UsersDetails.push(user);
    }else{
        ({...user} = req.body);
        UsersDetails[UsersDetails.findIndex(u=>u.email==req.email)]=user;
    }
    let audioFile=AudioFiles.find(af=>af.email == req.email);
    if(!audioFile){
        audioFile={email:req.email,language:null,path:null};
        ({...audioFile} = req.body.audioFile);
        AudioFiles.push(audioFile);
    }else{
        ({...audioFile} = req.body.audioFile);
        AudioFiles[AudioFiles.findIndex(af=>af.email==req.email)]=audioFile;
    }
        
    const b=UsersDetails;*/
    res.status(200).send();
}
