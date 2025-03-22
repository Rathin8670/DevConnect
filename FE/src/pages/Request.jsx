import React, { useEffect } from 'react'
import { RequestCard } from '../compoments/RequestCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'

export const Request = () => {
    const dispatch=useDispatch()
    const requests=useSelector((store)=>store.request)

    const fetchRequests=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/request/received",
            {withCredentials:true})

            console.log(res?.data?.data)
            dispatch(addRequest(res?.data?.data))
        }
        catch(err){
            console.log(err)
        }     
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    if(!requests) return;
    if(requests.length ===0 )return(
        <div className='flex justify-center text-2xl font-medium'>
            No Requests are found.
        </div>
    )
    return (
    <div className="grid gap-4  justify-center">
            {requests.map((res)=>(<RequestCard user={res}/>))}
    </div>
    )
}
