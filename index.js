const Express = require("express")
const App = Express()
const path = require("path")
const JWT = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
require("dotenv").config()
App.use(Express.static("./public"))
App.use(Express.urlencoded({extended:true}))
App.use(cookieParser())


App.get("/",(req,res)=>{

    if (!req.cookies.Token){
        res.sendFile(path.join(__dirname,"/index.html"))
    }else{
        res.send("Login Feito Com Exito!")
    }

})

App.post("/login",(req,res)=>{

    if (req.body.Name == "Trunks" && req.body.Password == "123"){
        const Token = JWT.sign({Login:true},process.env.SECRET,{expiresIn:"1h"})
        res.cookie("Token",Token,{httpOnly:true})
        res.send("Login Feito Com Exito!")
    }else{
        res.send("algum dos seus dados inserido estão errados.")
    }

})


App.listen(5000,()=>{
    console.log("Starting!")
})