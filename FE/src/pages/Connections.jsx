import { useEffect } from "react"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"
import { ConnectionCard } from "../compoments/ConnectionCard"

export const Connections=()=>{

    const connections=useSelector((store)=>store.connection)
    //console.log(connections)

    const dispatch=useDispatch()
    const fetchConnections= async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/connections",
                {withCredentials:true}
            )
           // console.log(res?.data?.data)
            dispatch(addConnections(res?.data?.data))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchConnections()
    },[])

    if(!connections) return;

    return (
        <div className="grid gap-4  justify-center">

        {connections.map((con)=>(<ConnectionCard user={con}/>))}
        </div>
    )
}