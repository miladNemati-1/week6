const mongoose = require('mongoose');

let patientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
                return ageValue >= 10 && ageValue <= 110;
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
                return des > 10;
            },
            message: 'not enoguh character'
        }



    }



    
});
module.exports = mongoose.model('Patient', patientSchema);