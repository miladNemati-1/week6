const mongoose = require('mongoose');

let patientSchema = mongoose.Schema({
    _id: {

        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    fullName: {
        type: String,
        required: true

        
        
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },

    age: {
        type: Number,
        validate: {
            validator: function (ageValue) {
                return ageValue >= 10 && ageValue <= 120;
            },
            message: 'Age should be a number between 0 and 120'
        }



    },
    dateOfVisit: {
        type: Date,
        default: Date.now

    },
    caseDescription: {
        type: String,
        validate: {
            validator: function (des) {
                return des.length > 10;
            },
            message: 'not enoguh character'
        }



    }



    
});
module.exports = mongoose.model('Patient', patientSchema);