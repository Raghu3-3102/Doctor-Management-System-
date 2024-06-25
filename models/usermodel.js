const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    passward: {
      type: String,
      required: true,
    },

    isDoctor: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    seenNotification: {
      type: Array,
      default: [],
    },

    unseenNotification: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const usermodel = mongoose.model("users", userschema);

module.exports = usermodel;
