const express = require('express');
const app = express();

const {calculation} = require('./modules/calculation');
const cors = require('cors');

app.use(cors());

const middleware = (req,res,next)=>{
    let result = calculation(2,3);
    if(result == 5){
        next()
    }else{
        res.status(400).send("you are not allowed")
    }
}

app.get('/',(req,res)=>{
    res.send("welcome")
})

app.get('/home',cors(),(req,res)=>{
    res.json({
        "empolyee":[
            {
                "name":"Ankitha Shettigar",
            }
        ]
    })
})

app.get('/api',middleware,(req,res)=>{
   console.log("Logged In")
   res.send("Logged In")
})

app.listen(9090,()=>{
    console.log("Server started");
})