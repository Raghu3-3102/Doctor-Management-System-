import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alerSlice";
import axios from "axios";
import { Table } from "antd";

function Userlist() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchor">Block</h1>
        </div>
      )
    },
  ];

  return (
    <Layout>
      <h1 className="page-header">user list</h1>
      <Table columns={columns} dataSource={users} className="tble"/>



    </Layout>
  );
}

export default Userlist;
