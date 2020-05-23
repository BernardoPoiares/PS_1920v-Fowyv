import bcrypt from "bcryptjs";


const Users=[
    {email:'a@a.a',password:bcrypt.hashSync('Hello', 8)}
]

export default Users;