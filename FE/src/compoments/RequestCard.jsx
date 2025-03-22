import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeRequest } from '../utils/requestSlice'

export const RequestCard = ({user}) => {
    const id=user._id
    const dispatch=useDispatch();

    const handleRequest=async(status)=>{
        try{
            const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},
                {withCredentials:true}
            )
            dispatch(removeRequest(id))
        }catch(err){
            console.log(err);
        }
    }

    
  return (
    <div className="card card-border w-96 ">
            <div className="card-body ">
                <h2 className="card-title">{user.fromUserId.firstName} {user.fromUserId.lastName}</h2>
                <p>{user.fromUserId.about}</p>
                <div className='flex gap-6'>
                    <button className="btn btn-primary" 
                    onClick={()=> handleRequest("accepted") }>Accept</button>
                    <button className="btn btn-primary" 
                    onClick={()=> handleRequest("rejected")}>Reject</button>
                </div>
            </div>
        </div>
  )
}
