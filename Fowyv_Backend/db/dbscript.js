db.Users.drop()
db.UsersChoices.drop()
db.UsersDetails.drop()
db.UsersMatches.drop()
db.UsersSearchSettings.drop()

db.createCollection("Users")
db.createCollection("UsersChoices")
db.createCollection("UsersDetails")
db.createCollection("UsersMatches")
db.createCollection("UsersSearchSettings")