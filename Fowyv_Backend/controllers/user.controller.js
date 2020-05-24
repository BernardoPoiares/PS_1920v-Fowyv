import UsersDetails from '../dummy/UsersDetails';
import AudioFiles from '../dummy/AudioFiles';

exports.saveDetails = (req, res) => {
    let user=UsersDetails.find(user=>user.email===req.email);
    if(!user)
        user={email:req.email}
    
    Object.assign(user,req.body);
    UsersDetails= UsersDetails.map(u=>u.email===req.email? user:u);

        
    res.status(200).send();
    
}

exports.setProfile = (req, res) => {
    let user=UsersDetails.find(user=>user.email===req.email);
    if(!user){
        user={email:req.email,name:null,age:null,icon:null};
        ({audioFile,...user} = req.body);
        UsersDetails.push(user);
    }else{
        ({...user} = req.body);
        UsersDetails[UsersDetails.findIndex(u=>u.email===req.email)]=user;
    }
    let audioFile=AudioFiles.find(af=>af.email===req.email);
    if(!audioFile){
        audioFile={email:req.email,language:null,path:null};
        ({...audioFile} = req.body.audioFile);
        AudioFiles.push(audioFile);
    }else{
        ({...audioFile} = req.body.audioFile);
        AudioFiles[AudioFiles.findIndex(af=>af.email===req.email)]=audioFile;
    }
        
    res.status(200).send();
}