"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFlaskVial } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";
import { FaElementor } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
// import NavigationLink from "./navbar-button";

function NavigationLink({ page, onNavigate }) {
  var icon;
  switch (page) {
    case "New Chain of Custody":
      icon = <FaFlaskVial />;
      break;
    case "Find Chain of Custody":
      icon = <HiDocumentSearch />;
      break;
    case "Test Data":
      icon = <FaElementor />;
      break;
    // case "Find Test":
    //   icon = <HiDocumentSearch />;
    //   break;
    default:
      icon = null;
  }

  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      <button onClick={onNavigate}>
        <div className="flex items-center h-4 hover:scale-110  hover:text-gray-300">
          <p>{icon}</p>
          <p className="mx-2">{page}</p>
        </div>
      </button>
      <p> | </p>
    </div>
  );
}

export default function Navbar({ pages, onNavigate }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleNavigate = (page) => {
    onNavigate(page);
  };

  const iconSwitch = (page) => {
    var icon;
    switch (page) {
      case "New Chain of Custody":
        return (icon = <FaFlaskVial />);
      case "Find Chain of Custody":
        return (icon = <HiDocumentSearch />);
      case "Test Data":
        return (icon = <FaElementor />);
      // case "Find Test":
      //   return (icon = <HiDocumentSearch />);
      default:
        return (icon = null);
    }
  };

  return (
    <nav className="fixed w-full nav-bar p-4 flex justify-between items-center left-0 top-0 z-50">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="text-white font-bold text-lg"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default link behavior
            window.location.reload(); // Reload the page
          }}
        >
          ARIS
        </Link>
      </div>
      {/* Middle Section - Navigation Links */}
      <div className="flex text-xl text-white items-center space-x-1 cursor-pointer">
        {pages.map((page, index) => (
          <div
            className="flex items-center cursor-pointer"
            key={index}
            onClick={() => handleNavigate(page)}
          >
            <div className="flex items-center mx-2 hover:scale-110 hover:text-gray-300">
              <p>{iconSwitch(page)}</p>
              <p className="mx-2">{page}</p>
            </div>
            <p>|</p>
          </div>
        ))}
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
}
