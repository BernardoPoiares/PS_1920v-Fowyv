import UsersChoises from '../dummy/UsersChoises';
import UsersMatches from '../dummy/UsersMatches';



exports.likeUser = (req, res) => {
    const userChoises= UsersChoises.find(user=>
        user.email == req.email);
    if(!userChoises)
        return res.status(404).send({ message: "User Not found." });
        
    userChoises.likedUsers.push(req.body);

    UsersChoises[UsersChoises.indexOf(user=>user.email == req.email)] = userChoises;

    const otherUserChoises= UsersChoises.find(user=>
        user.email == req.body.email);
    if(otherUserChoises.likedUsers.find(likedUser=>likedUser.email == req.email))
        UsersMatches.push({emails:[req.email,req.body.email],historic:[]})
 
    return res.status(200).send();
}

exports.dislikeUser = (req, res) => {
    const userChoises= UsersChoises.find(user=>
        user.email == req.email);
    if(!userChoises)
        return res.status(404).send({ message: "User Not found." });    
    
    userChoises.dislikedUsers.push(req.body);

    UsersChoises[UsersChoises.indexOf(user=>user.email == req.email)] = userChoises;
    return res.status(200).send();
    
}