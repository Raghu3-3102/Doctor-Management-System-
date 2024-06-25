const express = require("express");
const router = express.Router();
const user = require("../models/usermodel");
const Doctor = require("../models/doctoemodel");
const Appointment = require("../models/AppointmentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authmiddilewere = require("../middile_were/auth_middile_were");

router.post("/register", async (req, res) => {
  try {
    const userexist = await user.findOne({ email: req.body.email });
    console.log(userexist);
    if (userexist) {
      return res
        .status(200)
        .send({ message: "user all ready exist", success: false });
    }

    const passward = req.body.passward;
    const salt = await bcrypt.genSalt(10);
    const hashedpassward = await bcrypt.hash(passward, salt);
    req.body.passward = hashedpassward;

    const newuser = new user(req.body);

    await newuser.save();

    res
      .status(200)
      .send({ message: "user created sucessfully", success: true });
    res.end();
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userd = await user.findOne({ email: req.body.email });

    if (!userd) {
      return res
        .status(200)
        .send({ message: "user does not exist", success: false });
    }

    const ismatch = await bcrypt.compare(req.body.passward, userd.passward);

    if (!ismatch) {
      return res
        .status(200)
        .send({ message: "passward incorrect", success: false });
    } else {
      const token = jwt.sign({ id: userd._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .send({ message: "longin sucessfully", success: true, data: token });
    }
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .send({ message: "login failed", success: false, error });
  }
});

router.post("/get-user-info-by-id", authmiddilewere, async (req, res) => {
  try {
    const userd = await user.findOne({ _id: req.body.userId });
    userd.passward = undefined;
    console.log(userd);
    if (!userd) {
      return res
        .status(200)
        .send({ message: "user does not exist bhai log", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: userd,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "user does not exist", success: false });
  }
});

router.post("/apply-doctor-account", authmiddilewere, async (req, res) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    await newdoctor.save();
    const adminUser = await user.findOne({ isAdmin: true });
    console.log(`cheking admin is came or not : ${adminUser}`);
    const unseenNotification = adminUser.unseenNotification;
    console.log(unseenNotification);
    unseenNotification.push({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },

      onClickpath: "/Doctorlist",
    });

    await user.findByIdAndUpdate(adminUser._id, { unseenNotification });
    console.log(
      `admin ka id ${adminUser._id} aur array ${unseenNotification[0].data}`
    );

    res.status(200).send({
      success: true,
      message: "You Succesfully applyed for doctor account",
    });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    console.log(error);
  }
});

router.post(
  "/mark-all-notification-as-seen",
  authmiddilewere,
  async (req, res) => {
    try {
      const User = await user.findOne({ _id: req.body.userId });
      const unseenNotification = User.unseenNotification;
      const seenNotification = User.seenNotification;
      seenNotification.push(...unseenNotification);
      User.unseenNotification = [];
      User.seenNotification = seenNotification;
      const updatedUser = await User.save();
      updatedUser.passward = undefined;

      res.status(200).send({
        success: true,
        message: "all notification marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      res
        .status(500)
        .send({
          message: "Error applying doctor account",
          success: false,
          error,
        });
      console.log(error);
    }
  }
);

router.post("/delete-all-notification", authmiddilewere, async (req, res) => {
  try {
    const User = await user.findOne({ _id: req.body.userId });
    User.unseenNotification = [];
    User.seenNotification = [];
    const updatedUser = await User.save();
    updatedUser.passward = undefined;

    res.status(200).send({
      success: true,
      message: "all notification is deleted",
      data: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    console.log(error);
  }
});

router.get("/get-all-approved-doctors", authmiddilewere, async (req, res) => {
  try {
    console.log("riched");
    const doctor = await Doctor.find({ status: "approved" });

    res.status(200).send({
      message: "doctor fached suucessfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error appying doctor user", success: false, error });
    console.log(error);
  }
});

router.post("/book-appointment", authmiddilewere, async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    
    const User = await user.findOne({_id : req.body.doctorInfo.userId});
     User.unseenNotification.push({
      type : "new-appointment-reqest",
      message : `a new appointment request has been made by ${req.body.patinteName}`,
      onClickpath : '/doctor/appointment'
    });

    res.status(200).send({

       message : "appointment booked succesfully",
       success : true,

    })

    await User.save()


  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error booking in appointment ", success: false, error });
    console.log(error);
  }
});



module.exports = router;
