import React from "react";
import { Form, Col, Row, Input, lg, TimePicker, Button } from "antd";
import moment from "moment";

function DoctorForm({ onFinish, initialValues }) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
    
       initialValues={{
        ...initialValues,
        ...(initialValues && {timing: [
          moment(initialValues?.timing[0], 'HH:mm'),
          moment(initialValues?.timing[1], 'HH:mm'),
        ]})
      }}
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
        
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-buttons" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
