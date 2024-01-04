require('dotenv').config()
const express = require('express')
const routes = express.Router();
const mongoose = require('mongoose');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userDetail = require('../models/authSchema');
const requireLogin = require('../middleware/requireLogin')
routes.use(express.json())
// const UserDetail = mongoose.model('userDetail')
routes.post('/signup', async(req,res)=>{
    try{
        console.log(req.body)
        const { name, email, phone, gender, hearabtus, city, state, password } = req.body;
        if(!name || !email || !phone || !gender|| !hearabtus || !city || !state || !password){
            res.status(404).send('Please enter required fields')
        }else{

            userDetail.findOne({email : email})
            .then(registeredUser =>{
                if(!registeredUser){
                    const registration = new userDetail({
                        name, email, phone, gender, hearabtus, city, state, password
                    });
                    registration.save().then(()=>{
                        const token = jwt.sign({id:userDetail._id},JWT_SECRET_KEY,{expiresIn: '1day'});
                        res.send({result : {registration,token}})
                        console.log('Saved')
                    })
                    
                }
                else{
                    res.send({result :{ msg : "User already exsists"}})
                }
            })
        }
    }catch(err){
        res.status(404).send({err: err.message})
    }
})

routes.post('/login', async(req,res)=>{
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).send({ message: 'Please enter your email and password' })
        }
        const user = await userDetail.findOne({ email: email });
        const verified = await bcrypt.compare(password, user.password);
        if(verified){
            const token = jwt.sign({id:userDetail._id},JWT_SECRET_KEY,{expiresIn: '1day'});
            
            res.status(200).send({ result: 'Verified successfully',token: token})            
        }else{
            res.status(422).send({ result: 'mail id and password do not match' })
        }
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


module.exports = routes;