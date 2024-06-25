const express = require("express");
const router = express.Router();
const user = require("../models/usermodel");
const Doctor = require("../models/doctoemodel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authmiddilewere = require("../middile_were/auth_middile_were");

router.get("/get-all-users",authmiddilewere, async (req, res) => {
    try {
     
         console.log("riched");
      const users = await  user.find({});
      
      res.status(200).send({

        message : "User fached suucessfully",
        success : true ,        
        data : users,
      
      });
    } catch (error) {
        console.log(error);
      res
        .status(500)
        .send({ message: "Error appying doctor user", success: false, error });
      console.log(error);
    }
  });
router.get("/get-all-doctors",authmiddilewere, async (req, res) => {
    try {
     
         console.log("riched");
      const doctor = await  Doctor.find({});
      
      res.status(200).send({

        message : "doctor fached suucessfully",
        success : true ,        
        data : doctor,
      
      });
    } catch (error) {
        console.log(error);
      res
        .status(500)
        .send({ message: "Error appying doctor user", success: false, error });
      console.log(error);
    }
  });
  router.post("/change-doctor-status",authmiddilewere, async (req, res) => {
    try {
     
        const {doctorId,status} = req.body;

         const doctor = await Doctor.findByIdAndUpdate(doctorId,{
          status,
         });

       

         const User = await user.findOne({_id : doctor.userId});

         const unseenNotification = User.unseenNotification;
         console.log(unseenNotification);
         unseenNotification.push({
     
           type : "new-doctor-request-changed",
           message : `Your Doctor Account has been ${status}`,
           
     
           onClickpath : "/notification"
     
     
          });

          User.isDoctor = status === "approved" ? true : false;

     
          await User.save()
         

            res.status(200).send({
            message : "Doctor status updated succesfully",
            success : true,
            data : doctor,
           })

    } catch (error) {
        console.log(error);
      res
        .status(500)
        .send({ message: "Error appying doctor user", success: false, error });
      console.log(error);
    }
  });

  module.exports = router;