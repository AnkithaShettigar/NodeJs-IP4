const express = require('express');
const app = express();
const bycrpt = require('bcrypt');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const users = [];

app.get('/',(req,res)=>{
    res.json(users);
})

app.post('/users',jsonParser,async(req,res)=>{
    try{
        const salt = await bycrpt.genSalt();
        console.log(salt);
        const hashedPassword = await bycrpt.hash(req.body.password,salt);
        console.log(hashedPassword);
        console.log(req.body);
        const user = {name:req.body.name,password:hashedPassword,salt:salt}
        users.push(user)
        res.status(201).send()
    }catch{
        console.log("something went Wrong")
        res.status(500).send();
    }
})

app.post('/users/login',jsonParser,async(req,res)=>{
    const user = users.find(user =>user.name = req.body.name);
    if(user == null){
        return res.status(400).send("User Not found")
    }
    try{
        if(await bycrpt.compare(req.body.password,user.password)){
            res.status(200).send("Succefullu Login")
        }else{
            res.send("Password Not Correct,Please re-enter the password")
        }
    }catch{
        res.status(500).send("Internal Server Error")
    }
})

app.listen(8080,()=>{
    console.log("Server started.....")
})