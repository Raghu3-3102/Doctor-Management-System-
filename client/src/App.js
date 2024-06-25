import React from "react";
//  import 'antd/dist/antd.css';

import { Button, Flex } from "antd";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoutes from "./component/ProtectedRoutes";
import PublicRoutes from "./component/PublicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import Userlist from "./pages/admin/Userlist";
import Doctorlist from "./pages/admin/Doctorlist";
import Profile from "./pages/doctor/Profile";
import BOOK_Appointment from "./pages/BOOK_Appointment";
function App() {


  const { loading } = useSelector((state) => {
    return state.alerts;
   
  });

  console.log(loading);

    

  return (
    <>
      <BrowserRouter>
        {loading && (
          <div className="spinner-parent">
            <div class="spinner-border" role="status"></div>
          </div>
        )}

        <Toaster position="top-center" reverseOrder={true} />

        <Routes>
          <Route
            path="/Login"element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="/Register" element={<PublicRoutes><Register /></PublicRoutes>}/>
          <Route
            path="/"
            element={
               <ProtectedRoutes>
                <Home />
               </ProtectedRoutes> 
            }
          />
           <Route
            path="/apply-doctor"
            element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Notification"
            element={
              <ProtectedRoutes>
                <Notification />
              </ProtectedRoutes>
            }
          />
           <Route
            path="/Userlist"
            element={
              <ProtectedRoutes>
                <Userlist />
              </ProtectedRoutes>
            }
          />
           <Route
            path="/Doctorlist"
            element={
              <ProtectedRoutes>
                <Doctorlist />
              </ProtectedRoutes>
            }
          />

           <Route
            path="/profile/:userId"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
           <Route
            path="/BOOK-Appointment/:doctorId"
            element={
              <ProtectedRoutes>
                <BOOK_Appointment />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}







export default App;
