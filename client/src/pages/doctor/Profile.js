import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { Form, Col, Row, Input, lg, TimePicker, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import Link from 'antd/es/typography/Link'
import {  useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../../redux/alerSlice";
import DoctorForm from "../../component/DoctorForm";
import moment from "moment";

function Profile() {
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/update-doctor-profile",
        {
          ...value,
          userId: user._id,
          timing: [
            moment(value.timing[0]).format('HH:mm'),
            moment(value.timing[1]).format('HH:mm'),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something error");
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          userId: params.userId,
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

  useEffect(() => {
    getDoctorData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Doctor Profile</h1>
      <hr />
      {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor}/>}
    </Layout>
  );
}

export default Profile;
