const mongoose = require('mongoose');

let doctorSchema = mongoose.Schema({
    _id: {

        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        firstname: {

            type: String,
            required: true

        },
        lastname:{
            type: String,
            required: true

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



    },

    nop: {
        type:Number,
        required: true
    }


    
});
module.exports = mongoose.model('Doctor', doctorSchema);