import React, { useEffect } from "react";
import {NavBar} from "./NavBar.jsx"
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";


const Body = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const userData=useSelector((store)=> store.user)

    const fetchUser=async()=>{
        if(userData) return;
        
        try{
            const res=await axios.get(BASE_URL+"/profile/view",{
                withCredentials:true,
            });
            dispatch(addUser(res?.data?.user));
        }catch(err){
            if(err.status===401){
                navigate("/")
            }
            console.error(err)
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <div >
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default Body;
