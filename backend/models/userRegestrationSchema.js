const mongoose = require('mongoose');

const userHandlerSchema = new mongoose.Schema({
    username:{
        type: 'string',
        require : true
    },
    email:{
        type: 'string',
        require : true
    },
    phone:{
        type: 'number',
        require : true
    }

})
const userHandler = mongoose.model('userHandler',userHandlerSchema);
module.export = userHandler;
