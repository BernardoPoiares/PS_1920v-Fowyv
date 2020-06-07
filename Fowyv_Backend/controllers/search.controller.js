import UsersSearchSettings from '../dummy/UsersSearchSettings';
import UsersDetails from '../dummy/UsersDetails';


exports.getSearchSettings = (req, res) => {
    const user=UsersSearchSettings.find(user=>
        user.email == req.email);
    if(!user)
        return res.status(404).send({ message: "User Not found." });
    return res.status(200).json(user);
}

exports.setSearchSettings = (req, res) => {
    let user=UsersSearchSettings.find(user=>user.email == req.email);
    if(!user)
        user={email:req.email}
    
    Object.assign(user,req.body);
    UsersDetails= UsersDetails.map(u=>u.email ==req.email ? user:u);

    res.status(200).send();
    
}

exports.searchUsers = (req, res) => {
    usersNotLiked = UsersSearchSettings.find(user=>user.email == req.email);
    if(!usersNotLiked)
        return res.status(404).send({ message: "User Not found." });
    var usersSearchResult = UsersDetails.filter(user => user.email != req.email);

    if(usersNotLiked!=null && usersNotLiked.users.Length != 0 )
        usersSearchResult = usersSearchResult.filter(val => !usersNotLiked.users.includes(val))
            
    res.status(200).send(usersSearchResult);
    
}