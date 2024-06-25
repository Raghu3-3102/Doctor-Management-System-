import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";


function Layout({ children }) {
  const [collapsed, setcollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  console.log(user);
  const Navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointment",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Aplly Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-file-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },

    {
      name: "users",
      path: "/Userlist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/Doctorlist",
      icon: "ri-user-add-line",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-file-user-line",
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },

    {
      name: "Appointment",
      path: "/appointment",
      icon: "ri-file-list-line",
    },
   

    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: "ri-file-user-line",
    },
  ];

  const menutoberander = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;
  const role = user?.isAdmin ? 'admin' : user?.isDoctor ? "Doctor" : "user";

  return (
    <div className="main p-3">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="heaid">
              <i class="ri-heart-add-line"></i>
              <h1 className="normal-text">{role}</h1>
            </h1>
          </div>

          <div className="menu">
            {menutoberander.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && `active-menu-item`
                  }`}
                >
                  <Link to={menu.path}>
                    {" "}
                    <i className={menu.icon}></i>
                  </Link>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                Navigate("/login");
              }}
            >
              <Link to="/login">
                <i className="ri-logout-circle-line"></i>
              </Link>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                class="ri-menu-2-fill header-action-icon"
                onClick={() => setcollapsed(false)}
              ></i>
            ) : (
              <i
                class="ri-close-line header-action-icon"
                onClick={() => setcollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4 noti">
            
              <Badge count={user?.unseenNotification.length} onClick = {()=>Navigate('/Notification')}>
              <i className="ri-notification-line headerd-action-icon "></i>
              </Badge>
              
              <Link className="anchor px--5" to={`/profile/${user?._id}`}>
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
