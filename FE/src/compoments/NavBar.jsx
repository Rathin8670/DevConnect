import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";
import { removeUser } from "../utils/userSlice.js";
import axios from "axios";

function NavBar() {
  const user = useSelector((store) => store.user);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
   // Handle image error
  const handleImageError = () => {
    setImgError(true);
  };
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async()=>{

    try{
      await axios.post(BASE_URL+"/logout",
        {},
        {withCredentials:true}
      );
      dispatch(removeUser());
      navigate("/login")
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex gap-2">
          <Link to={'/'} >
          <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">🧑🏼‍💻 DevConnect</p></Link>
        </div>
      
        <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Profile Picture with Click */}
          <div className="relative">

          <img
              className="w-8 h-8 mx-4 rounded-full cursor-pointer"
              src={
                imgError || !user?.photoUrl
                  ? "https://imgur.com/HzJRaWA"
                  : user.photoUrl
              }
              alt="user photo"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onError={handleImageError} // Handle broken image
            />

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3">
                {user ? (
                    <p className="block text-sm text-gray-900 dark:text-white">Welcome, {user.firstName}</p>
                    
                  ) : (
                  <p className="block text-sm text-gray-900 dark:text-white">Welcome,UK</p>
                  )}

                {user ? (
                    <p className="block text-sm text-gray-900 dark:text-white"> {user.email}</p>
                    
                  ) : (
                  <p className="block text-sm text-gray-900 dark:text-white">uk@gmail.com</p>
                  )}
                </div>


                <ul className="py-2">
                <Link to={'/profile'}>
                  <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"> Profile
                  </li>
                  </Link>

                  <Link to={'/connections'}>
                  <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"> Connections
                  </li>
                  </Link>
                  <Link to={'/requests'}>
                  <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"> Requests
                  </li>
                  </Link>
                  <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer" 
                  onClick={handleLogout} >Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
