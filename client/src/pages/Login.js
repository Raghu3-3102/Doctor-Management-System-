import React from 'react'
import {Button, Form } from 'antd';
// import Link from 'antd/es/typography/Link'
import { Link, useNavigate } from 'react-router-dom';
import {Route} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import Logo from '../images/doctor_image_4.jpg'
import { useSelector,useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alerSlice';

function Login() {


  const dispatch = useDispatch();
   const navigate = useNavigate();
  const onFinish = async (value)=>{

    console.log("recived value of form",value);

    try {

      dispatch(showLoading())
      const response = await axios.post("/api/user/login", value);
      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to home page");
        localStorage.setItem('token',response.data.data);
        navigate('/')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {

      dispatch(hideLoading());
      toast.error("something error");
    }


  }

  return (

    

    <div className='auth'>

<img src = {Logo} alt="Logo" />

      <div className='auth-form card p-2'>

      
          <h1 className='card-title'>Stay Helthy</h1>
         <Form layout='vertical' className='Form' onFinish={onFinish}>
            
             

              <Form.Item label = "Email" name = "email" className='lable'>

              <input placeholder='Email' width={100}/>

              </Form.Item>

              <Form.Item label = "Passward" name = "passward" className='lable'>

              <input placeholder='Passward' type='passward'/>

              

              </Form.Item>

              <button className='primary-button' htmlType = "submit" >Login</button>

              <Link to = "/Register" className='anchor'> click if you  want to Register</Link>
              
             
            


         </Form>


      </div>
      
    </div>
  )
}

export default Login;
