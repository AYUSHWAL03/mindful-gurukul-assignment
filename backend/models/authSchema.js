const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    phone:{
        type : Number,
        required:true
    },
    gender:{
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    hearabtus:[{
        type : String,
        // enum: ['LinkedIn', 'Friends','Job Portals', 'Other'],
        required:true
    }],
    city:{
        type : String,
        enum: ['Pune', 'Mumbai','Ahemdabad'],
        required:true
    },
    state:{
        type : String,
        // enum: ['Gujarat', 'Maharashtra','Karnataka'],
        required:true
    }
    ,password:{
        type : String,
        required:true
    }
});
userSchema.pre('save',function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password,10);

    }
    next();
    
})

const userDetail = mongoose.model('userDetail', userSchema);

module.exports = userDetail;