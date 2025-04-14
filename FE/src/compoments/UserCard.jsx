import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeFeed } from "../utils/feedSlice"

export const UserCard = ({user}) => {
    //console.log(user)
    const {_id,firstName,lastName,photoUrl,skills,about,lookingFor,gender,age}=user
    const dispatch=useDispatch();

    const handleSendRequest=async(status)=>{
        try{
            const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true});

        }catch(err){
            console.log(err)
        }
        dispatch(removeFeed(_id));
    }
    return (
        <div className="w-full max-w-md p-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={photoUrl} alt="User Photo" />

                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{firstName} {lastName}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400"> {gender},{age}</p>
                    

                    <p className="text-sm text-gray-500 dark:text-gray-400">Skills :       
                        {skills.slice(0, skills.length - 1).map((skill, index) => (
                        <span key={index}> {skill} | </span>
                        
                    ))} <span key={skills.length - 1}>{skills[skills.length - 1]}  </span> </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">About : {about}</p>

                    <div className="flex  mt-4 md:mt-6">
                        <button className="inline-flex items-center mx-4 px-4 py-2 text-sm font-medium text-center text-white bg-pink-500 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800" onClick={()=>handleSendRequest("interested")}>Interested</button>
                        <button className="py-2 mx-4 px-4 ms-2 text-sm font-medium text-white  bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 " onClick={()=> handleSendRequest("ignore")}>Ignore</button>
                    </div>
                </div>
            </div>
    )
}


