import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants.js"
import { addFeed } from "../utils/feedSlice.js";
import { useEffect } from "react";
import axios from "axios"
import { UserCard } from "./UserCard.jsx";

export const Feed=()=>{
    const feed=useSelector((store)=>store.feed);
    const dispatch=useDispatch();

    const getFeed=async()=>{
            try{
                if(feed) return;
                const res=await axios.get(BASE_URL+"/user/feed",
                    {withCredentials:true}
                )
               // console.log(res);
                dispatch(addFeed(res?.data?.data))
            }catch(err){
                console.error("ERR in feed API.", err);
            }
    }

    useEffect(()=>{
        getFeed()
    },[])

    return feed && (
        <div className="m-20 flex justify-center">
            <UserCard user={feed[5]}/>
        </div>
    )
}