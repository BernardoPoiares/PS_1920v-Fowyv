import UsersSearchSettings from '../dummy/UsersSearchSettings';
import UsersDetails from '../dummy/UsersDetails';
import UsersChoises from '../dummy/UsersChoises';

import {GetAge} from '../utils/dates';


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

    UsersSearchSettings[UsersSearchSettings.indexOf(user=>user.email == req.email)] = user;

    res.status(200).send();
    
}

exports.searchUsers = (req, res) => {
    let userSearchSettings = UsersSearchSettings.find(user=>user.email == req.email);
    if(!userSearchSettings)
        return res.status(404).send({ message: "User Not found." });
    let usersChoises = UsersChoises.find(user=>user.email == req.email);
    if(!usersChoises)
        return res.status(404).send({ message: "User Not found." });
    let usersSearchResult = UsersDetails.filter(user => user.email != req.email);
    if(usersSearchResult != null && usersSearchResult != undefined && usersSearchResult.length > 0 )
        usersSearchResult = usersSearchResult.filter(user => !usersChoises.dislikedUsers.includes(user) && GetAge(user.age)>=userSearchSettings.minSearchAge && GetAge(user.age)<=userSearchSettings.maxSearchAge && userSearchSettings.searchGenders.includes(user.gender))
            
    res.status(200).send(usersSearchResult);
    
}