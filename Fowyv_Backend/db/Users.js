import bcrypt from "bcryptjs";

let Users=[
    {email:'a@a.a',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'b@b.b',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'c@c.c',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'e@e.e',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'f@f.f',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'g@g.g',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'h@h.h',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'i@i.i',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'s@s.s',password:bcrypt.hashSync('Hello&23', 8)},
    {email:'d@d.d',password:bcrypt.hashSync('Hello&23', 8)}
]

export default Users;