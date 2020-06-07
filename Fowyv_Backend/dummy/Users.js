import bcrypt from "bcryptjs";

let Users=[
    {email:'a@a.a',password:bcrypt.hashSync('Hello', 8)}
]

export default Users;