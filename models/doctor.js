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
            get: function (value) {
                return (value.toUpperCase());},
            required: true,
            validate: {
                validator: function (des) {
                    return des.length >= 2 && des.length <= 3;
                },
                message: 'not enoguh character for state'
            }

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