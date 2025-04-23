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
                //console.log(res?.data?.data);
                dispatch(addFeed(res?.data?.data))
            }catch(err){
                console.error("ERR in feed API.", err);
            }
    }

    useEffect(()=>{
        getFeed()
    },[])

    if(!feed) return;
    if(feed.length <=0) return <h1 className="flex justify-center">No more User Found.</h1>
    return feed && (
        <div className="m-20 flex justify-center">
            <UserCard user={feed[0]}/>
        </div>
    )
}