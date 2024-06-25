import React from "react";
import Layout from "../component/Layout";
import { Form, Col, Row, Input, lg, TimePicker, Button , Space} from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import Link from 'antd/es/typography/Link'
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { Route } from "react-router-dom";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alerSlice";
import DoctorForm from "../component/DoctorForm";
import moment from "moment";

function ApplyDoctor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {

      console.log(value);

      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        {
          ...value,
          userId: user._id,
          timing: [
            moment(value.timing[0]).format('HH:mm'),
            moment(value.timing[1]).format('HH:mm')
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

  return (
    <Layout>
      <h4 className="card-title">Apply For Doctor</h4>
      <hr />
      <Form
      layout="vertical"
      onFinish={onFinish}
    >
      <h1 className="page-title">Persnol Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Firs Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="last Name" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="website"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="website" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Adress" name="address" rules={[{ required: true }]}>
            <Input placeholder="Adress" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="page-title">Persnol Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Expirence"
            name="expirence"
            rules={[{ required: true }]}
          >
            <Input placeholder="Expirence" type="Number" />
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            label="Fee Per Cunseltation"
            name="feePerCunseltation"
            rules={[{ required: true }]}
          >
            <Input placeholder="fee Per Cunseltation" type="number" />
          </Form.Item>
        </Col>
      
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Timing"
              name="timing"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format='HH:mm' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              label="Timing"
              name="timing"
              rules={[{ required: true }]}
            >
              <Input type="Date" placeholder="enter date" />
            </Form.Item>
          </Col>
        
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-buttons" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
    </Layout>
  );
}

export default ApplyDoctor;
