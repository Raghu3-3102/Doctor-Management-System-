const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({

    userId : {
        type : String,
        require : true
    },
    doctorId : {
        type : String,
        require : true
    },
    doctorInfo : {
        type : String,
        require : true
    },
    userInfo : {
        type : String,
        require : true
    },
    date : {
        type : String,
        require : true
    },
    time : {
        type : Array,
        require : true
    },
    status : {

        type : String,
        require : true,
        default : "pending",
    },
},
{
    timestamps: true,
  }


)

const appointmentModel = mongoose.model('Appointment',appointmentSchema)

module.exports = appointmentModel;