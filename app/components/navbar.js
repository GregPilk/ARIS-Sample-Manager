"use client";

import { useState } from "react";
import Link from "next/link";
// import { useUserAuth } from "../_utils/auth-context";
import { FaFlaskVial } from "react-icons/fa6";
import { HiDocumentSearch, HiSparkles } from "react-icons/hi";
import { MdDashboardCustomize } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  // const { user, firebaseSignOut } = useUserAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const handleLogout = async () => {
  //   await firebaseSignOut();
  // };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="fixed w-full nav-bar p-4 flex justify-between items-center left-0 top-0 z-50">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-white font-bold text-lg">
          ARIS
        </Link>
      </div>

      {/* Middle Section - Navigation Links */}
      <div className="flex items-center space-x-4">
        <Link
          href="/pages/dashboard"
          className="flex items-center text-white hover:text-gray-300"
        >
          <MdDashboardCustomize className="mr-2" />
          Dashboard
        </Link>
        <p> | </p>
        <div className="flex items-center space-x-1 hover:scale-110">
          <Link
            href="/pages/input/new-sample"
            className="flex items-center text-white hover:text-gray-300"
          >
            <FaFlaskVial className="mr-2" />
            New Sample
          </Link>
        </div>
        <p> | </p>
        <div className="flex items-center space-x-1 hover:scale-110">
          <Link
            href="/pages/output/find-sample"
            className="flex items-center text-white hover:text-gray-300"
          >
            <HiDocumentSearch className="mr-2" />
            Find Sample
          </Link>
        </div>
        <p> | </p>
        <div className="flex items-center space-x-1 hover:scale-110">
          <Link
            href="/pages/sarahSkeleton/app"
            className="flex items-center text-white hover:text-gray-300"
          >
            <HiSparkles className="mr-2" />
            Skeleton
          </Link>
        </div>
      </div>

      {/* Right Section - User Information and Dropdown */}
      <div className="flex items-center space-x-4">
        {/* {user && ( */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-white hover:text-gray-200"
          >
            <div className="flex-container nav-custom">
              {/* {user.email || "User"} */}
              {"User"}
              <div className="nav-image"> IM </div>
            </div>

            <GiHamburgerMenu className=" scale-150 ml-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg py-1 dropdown-menu">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                // onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
        {/* )} */}
      </div>
    </nav>
  );
};

export default Navbar;
