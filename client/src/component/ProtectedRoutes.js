import React, { useEffect } from 'react'
import { Navigate,useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { setUser } from '../redux/UserSlice'
import { hideLoading, showLoading } from '../redux/alerSlice'


function ProtectedRoutes(props) {

    const {user,reloadUser} = useSelector((state) => state.user)
    const Navigated = useNavigate()
    const dispatch = useDispatch();

    const getUser = async()=>{

        try {

            dispatch(showLoading())
            const response = await axios.post('/api/user/get-user-info-by-id',
            {
                token : localStorage.getItem('token')
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
            }
            );

            dispatch(hideLoading());

            if (response.data.success) {

              dispatch(setUser(response.data.data));
              
                
            }
            else{
               
               
                localStorage.clear();
                Navigated('/Login')
            }
            
        } catch (error) {

           
            dispatch(hideLoading());
            localStorage.clear();
            Navigated('/Login');
          

            
        }

    }

    useEffect(()=>{

        if (!user || reloadUser) {

            getUser()

                }
    },[user,reloadUser])
  
    if (localStorage.getItem('token')) {

        return props.children;
        
    }else{

        return <Navigate to="Login" />;

    }



}

export default ProtectedRoutes;
