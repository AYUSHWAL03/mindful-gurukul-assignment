const express = require('express')
const routes = express.Router();

const { default: mongoose } = require('mongoose');
const Userhandler = mongoose.model('userHandler');
// const mongoose = require('mongoose');
routes.use(express.json());
routes.post('/api/post-userdata',(req,res)=>{
    try {
        const {username,email,phone} = req.body;
        if(!username || !email || !phone){
            res.status(404).send('Please enter all required fields')
        }else{
            const postuserdata = new Userhandler({
                username,email,phone
            })
            postuserdata.save().then(()=>{
                res.status(200).send({message : 'user added successfully', data : postuserdata})
            })
        }
    } catch (err) {
        res.status(404).send({err: err.message})
    }
})
routes.get('/api/users',async (req, res) => {
    try{
        const response = await Userhandler.find()
        if(response.length > 0){
            res.status(200).send(response)    
        }else{
            res.status(404).send({err:"No data found"})
        }
    }catch (err) {
        res.status(404).send({err: err.message})
    } 
})
routes.post('/api/delete-users',async (req, res) => {
    try {
        const { email } = await req.body;
        Userhandler.deleteOne({email : email})
        .then(()=>{
            res.status(200).send({"msg" : "deleted successfully"})
        }) 
    } catch (error) {
        res.status(404).send({err: error.message})
    }   
})

routes.patch('/api/update-user',async (req, res) => {
    try {
        const { username , email, phone } = req.body;
        const updatedUserDetail = {username , email, phone};
        // const userId = await Userhandler.findOne({})
        // considering username is unique field
        const updatedUser = await Userhandler.findOneAndUpdate(
            { username: username},
            updatedUserDetail,
            { new: true } // to return the modified document
        );
        
        if (updatedUser) {
            res.status(200).send({ msg: "Updated successfully", data: updatedUser });
        } else {
            res.status(404).send({ err: "User not found or not modified" });
        }
        
    } catch (error) {
        res.status(404).send({err: error.message})
        
    }   
})


module.exports = routes