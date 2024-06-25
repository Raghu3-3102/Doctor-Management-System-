import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import {
  Form,
  Col,
  Row,
  Input,
  lg,
  TimePicker,
  Button,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import Link from 'antd/es/typography/Link'
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alerSlice";
import DoctorForm from "../component/DoctorForm";
import moment from "moment";
import { set } from "mongoose";

function BOOK_Appointment() {
  const [isAvailable, setisAvailable] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-doctor-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const booKnow = async () => {
    try {

     
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          patinteName : user.name,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        
      }
    } catch (error) {
      console.log("something error");
      toast.error("error in booking ")
      dispatch(hideLoading());
    }
  };
  console.log(`${date},${time}`)
  console.log(user.name);
  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      {doctor && (
        <div>
          <h1>
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <br />
          
  
          <Row>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timing :</b>
                {doctor.timing[0]} - {doctor.timing[1]}
              </h1>

              <div className="d-flex flex-column">
                <DatePicker
                  className="mt-3"
                  onChange={(value) =>{
                   
                    
                    setDate(value)

                  }
                    

                  }
                  rules={[{ required: true }]}
                />
                <TimePicker
                  className="mt-3"
                  onChange={(value) => {
                    setTime(value)
                  }
                  }
                  rules={[{ required: true }]}
                />
                <br />
                <Button className="primary-button">check availiblity</Button>
                <Button className="primary-button"    onClick={booKnow}>
                  Book now
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BOOK_Appointment;
