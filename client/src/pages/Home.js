import React, { useEffect, useState } from "react";

import axios from "axios";
import Layout from "../component/Layout";
import Doctor from "../component/Doctor";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alerSlice";

function Home() {
  const [doctors, setdoctors] = useState([]);
  const disPactch = useDispatch();

  const getdata = async () => {
    try {
      disPactch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      disPactch(hideLoading());
      if (response.data.success) {
        console.log(response.data.data);
        setdoctors(response.data.data);
      }
    } catch (error) {
      console.log(error);
      disPactch(hideLoading());
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <Layout>
    <Row gutter={24}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
