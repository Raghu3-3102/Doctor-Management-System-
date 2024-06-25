const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctoemodel')
const  authmiddilewere = require('../middile_were/auth_middile_were')

router.post("/get-doctor-info-by-id", authmiddilewere, async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ userId : req.body.userId });
       res.status(200).send(
        {
            success : true,
            message : "Doctor info fached succesfully",
            data : doctor,     
        }
       )
    } catch (error) {
      res.status(500).send({ message: "errorgeting doctor info", success: false });
    }
  });

  router.post("/update-doctor-profile", authmiddilewere, async (req, res) => {
    try {
      const doctor = await Doctor.findOneAndUpdate(
        {userId : req.body.userId},req.body);
        console.log("mill gya"+ doctor);
       res.status(200).send(
        {
            success : true,
            message : "Doctor profile updated  succesfully",
            data : doctor,     
        }
       )
    } catch (error) {
      res.status(500).send({ message: "errorgeting doctor info", success: false });
    }
  });

  router.post("/get-doctor-info-by-doctor-id", authmiddilewere, async (req, res) => {
    try {
      const doctor = await Doctor.findOne({ _id : req.body.doctorId });
       res.status(200).send(
        {
            success : true,
            message : "Doctor info fached succesfully",
            data : doctor,     
        }
       )
    } catch (error) {
      res.status(500).send({ message: "errorgeting doctor info", success: false });
    }
  });



  module.exports = router;