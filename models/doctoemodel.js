const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    expirence: {
      type: String,
      required: true,
    },
    feePerCunseltation: {
      type: String,
      required: true,
    },
    timing: {
      type: Array,
      required : true,
     
    },

    status : {

      type : String,
      default : "pending",
    }
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("doctors", doctorSchema);

module.exports = doctorModel;
