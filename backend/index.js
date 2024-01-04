require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// psw : ayushwal
app.use(cors())
mongoose.connect(process.env.MONGO_URL);
require('./models/authSchema')

require('./models/userRegestrationSchema')
app.use(express.urlencoded({ extended: true }));
app.use(require('./router/authentication'));
app.use(require('./router/handleUser'))
app.listen(3000,(req,res)=>{
    console.log('port listening on port http://localhost:3000');
})