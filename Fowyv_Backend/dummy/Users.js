import bcrypt from "bcryptjs";

let Users=[
    {email:'a@a.a',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'s@s.s',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'d@d.d',password:bcrypt.hashSync('Hello&23', 8)}
]

export default Users;