import React from "react";
import { Button, Form } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import Link from 'antd/es/typography/Link'
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { Route } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from '../images/doctor_image.jpg'
import { hideLoading, showLoading } from "../redux/alerSlice";


function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (value) => {

    

    console.log("recived value of form", value.email);

    try {

      dispatch(showLoading())
      const response = await axios.post("/api/user/register", value);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to login page");
        navigate("/Login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {

      dispatch(hideLoading());
      toast.error("something error");
    }
  };

  return (
    <div className="auth">
        
        <img src = {Logo} alt="Logo" />
        
      <div className="auth-form card p-2">
        <h1 className="card-title">Stay Helthy</h1>
        <Form layout="vertical" className="Form" onFinish={onFinish}>
          <Form.Item label="Name" name="name" className="lable">
            <input placeholder="Name" />
          </Form.Item>

          <Form.Item label="Email" name="email" className="lable">
            <input placeholder="Email" width={100} />
          </Form.Item>

          <Form.Item label="Passward" name="passward" className="lable">
            <input placeholder="Passward" type="passward" />
          </Form.Item>

          <button className="primary-button" htmlType="submit">
            Register
          </button>

          <Link to="/Login" className="anchor">
            {" "}
            click if you allready registerd
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
