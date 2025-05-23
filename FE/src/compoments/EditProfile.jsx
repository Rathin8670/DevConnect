import axios from "axios";
import {  useState } from "react"
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

export const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [about, setAbout] = useState(user?.about || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [skills,setSkills]=useState(user?.skills)
    //const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [age, setAge] = useState(user?.age || "");
    const [showToast,setShowToast]=useState(false);

    const dispatch=useDispatch();

    const saveProfile=async()=>{
        try{
            const res = await axios.put(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    skills,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data?.updatedUser))
            setShowToast(true);
            setTimeout(()=>{
                setShowToast(false)
            },3000);

        }catch(err){
            setError(err.message);

        }
        
    }
   
    return (
        <>
        <div className="py-10 my-auto dark:bg-gray-900">
            <div className="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] sm:w-[88%] w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <div className="">
                <h1
                    className="lg:text-3xl md:text-2xl text-xl font-serif flex justify-center font-extrabold mb-2 dark:text-white">
                    Update Profile
                </h1>
                <form>
                    <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">

                    <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                        <label >
                            <svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none"
                                stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                </path>
                            </svg>
                        </label>
                            </div>
                        </div>
                    
                    <h2 className="text-center mt-1 font-semibold dark:text-gray-300">Upload Profile and Cover Image
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label  className="mb-2 dark:text-gray-300">First Name</label>
                            <input type="text"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e)=> setFirstName(e.target.value)} />
                        </div>
                        <div className="w-full  mb-4 mt-6">
                            <label  className="mb-2 dark:text-gray-300">Last Name</label>
                            <input type="text"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e)=> setLastName(e.target.value)} />
                        </div>
                        
                    </div>
                    <div className="w-full  mb-4 mt-6">
                            <label  className="mb-2 dark:text-gray-300">About</label>
                            <input type="text"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="About"
                                value={about}
                                onChange={(e)=> setAbout(e.target.value)} />
                        </div>
                        <div className="w-full  mb-4 mt-6">
                            <label  className="mb-2 dark:text-gray-300">Skills</label>
                            <input type="text"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="skills"
                                value={skills}
                                onChange={(e)=> setSkills(e.target.value)} />
                        </div>
                    
                    <div className="flex flex-col lg:flex-row  gap-2 justify-center w-full">
                        <div className="w-full">
                            <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                            <select
                                className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800 "
                                value={gender}
                                onChange={(e)=>setGender(e.target.value)}>
                                <option disabled value="">Select Sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <div className="w-full  mb-4 mt-6">
                            <label  className="mb-2 dark:text-gray-300">Age</label>
                            <input type="text"
                                className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                placeholder="sex"
                                value={age}
                                onChange={(e)=> setAge(e.target.value)} />
                        </div>
                        </div>
                        
                    </div>
                    <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                        <button  className="w-full p-4 cursor-pointer"
                        onClick={saveProfile}>Save Profile</button>
                    </div>
                </form>
            </div>
                </div>
            </div>
        </div>

        { showToast && (<div className="toast toast-center toast-middle">
            <div className="alert alert-success">
                <span>User updated  successfully.</span>
            </div>
        </div>)}
    </>
    )
}

{/* <div className="flex flex-col lg:flex-row  gap-2 justify-center w-full">
<div className="w-full">
    <h3 className="dark:text-gray-300 mb-2">Sex</h3>
    <select
        className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
        <option disabled value="">Select Sex</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>
</div> */}