import React from "react";
import Layout from "../component/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/alerSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/UserSlice";

function Notification() {
  const { user } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(user);

  const markallasseen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notification-as-seen",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something error");
    }
  };

  const deleteall = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
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
      <h1 className="page-title">Notifications</h1>

      <Tabs>
        <Tabs.TabPane tab="unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => markallasseen()}>
              mark all as seen
            </h1>
          </div>

          {user?.unseenNotification.map((notification) => (
            <div
              className="card p-2 m-2"
              onClick={() => Navigate(notification.onClickpath)}
            >
              <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor"onClick={() => deleteall()} >delete all</h1>
          </div>

          {user?.seenNotification.map((notification) => (
            <div
              className="card p-2 m-2"
              onClick={() => Navigate(notification.onClickpath)}
            >
              <div className="noti-text" >{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notification;