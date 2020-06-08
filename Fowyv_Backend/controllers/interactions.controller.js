import UsersChoises from '../dummy/UsersChoises';


exports.likeUser = (req, res) => {
    const userChoises= UsersChoises.find(user=>
        user.email == req.email);
    if(!userChoises)
        return res.status(404).send({ message: "User Not found." });
        
    userChoises.dislikedUsers.push(req.body);

    UsersChoises[UsersChoises.indexOf(user=>user.email == req.email)] = userChoises;

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