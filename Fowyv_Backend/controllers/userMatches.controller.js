

exports.getMatches = (req, res) => {
    /*const matches=UsersMatches.filter(match=>
        match.emails.includes(req.email));
    if(!matches)
        return res.status(404).send({ message: "Matches Not found." });
    const matchesDetails = UsersDetails
    .filter(u=>u.email != req.email)
    .filter( user=> 
        matches.some(match=>
            match.emails.includes(user.email))
    );
    return res.status(200).json(matchesDetails);*/
    return res.status(200).send();
}
