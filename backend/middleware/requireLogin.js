const jwt = require("jsonwebtoken")
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET_KEY
const mongoose = require('mongoose')
const Registration = mongoose.model("userDetail")
module.exports  = (req,res,next)=>{
    const{authorization} = req.headers
    if(!authorization){
        res.status(401).json({error:"you must be logged in"})

    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged"})

        }
        const{_id} = payload
        Registration.findById(_id).then(studentData=>{
            req.user = studentData
            next()
        })
    })
}