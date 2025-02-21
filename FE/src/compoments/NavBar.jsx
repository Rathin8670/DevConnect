import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavBar() {
  const user = useSelector((store) => store.user);
 // console.log("from navber")
 // console.log(user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex gap-2">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">🧑🏼‍💻 DevConnect</span>
        </div>

        <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Profile Picture with Click */}
          <div className="relative">
            <img
              className="w-8 h-8 mx-4 rounded-full cursor-pointer"
              src="{user.photoUrl}"
              alt="user photo"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                </div>
                <ul className="py-2">
                  <li>
                    <Link
                      to={'/update'}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/'}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Log out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
