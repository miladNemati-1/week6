const mongoose = require('mongoose');

let doctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {

            type: String,
            required: true

        },
        lastName:{
            type: String,

        }
        
    },
    dob: {
        type: Date,
    },

    address: {
        state: {

            type: String,
            required: true

        },
        suburb:{
            type: String,
            required: true

        },
        street: {

            type: String,
            required: true

        },
        unit:{
            type: String,
            required: true

        },
        nop: {
            type:Number
        }


    },


    
});
module.exports = mongoose.model('Doctor', doctorSchema);