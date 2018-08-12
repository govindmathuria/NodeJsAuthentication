const express =require('express')
const jwt=require('jsonwebtoken')

const app =express();
app.get('/api',(req,res)=>{
res.json({
    message:'welcome to api'
})
});

app.post('/api',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkeygovind',(err,data)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.send({
                message:'post method',
                authdata:data

            })
        }
    })
   
    });
    
    app.get('/api/login',(req,res)=>{

        let user ={
            name:'govind mathuria',
            email :'govindmathuria94@gmail.com'
        }
        jwt.sign({user:user},'secretkeygovind',{expiresIn:'120s'},(err,token)=>{
            let usertoken={
                token:token
            }
            res.send(usertoken)
        })
    })
    


app.listen(5000,()=>{console.log('server started on port 5000')})


//Format of Token
// Authorization : Bearer <access-token>
function verifyToken(req,res,next){

    //Get Header value
    const bearheaders=req.headers['authorization'];
console.log(bearheaders)
    if(typeof bearheaders !== 'undefined' ){
const bearrerheaders = bearheaders.split(' ');
const bearerToken=bearrerheaders[1];
req.token=bearerToken;
next();

    }
    else{
        res.sendStatus(403)
    }
}