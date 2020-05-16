var express = require("express");

var app = express();

app.listen(3001, ()=>{
    console.log("Server running on port 3001");
})

app.post("/user/login",(req,res,next)=>{
    res.json({token:"Hello"})
})