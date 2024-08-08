"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaFlaskVial } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";
import { FaElementor } from "react-icons/fa";
import { FaBattleNet } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
// import NavigationLink from "./navbar-button";

// Added by: Adam
// Date: 2024-06-23
// This component is used to display the navigation bar at the top of the page.
// Edited by: Greg
// Date: 2024-07-10
// Edited by: Dawson
// Date: 2024-08-07

export default function Navbar({ pages, onNavigate }) {
  const { data: session } = useSession();

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
      case "Admin":
        return (icon = <MdAdminPanelSettings />);
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
        {pages
          .filter((page) => page !== "Admin" || session?.user?.role === "admin")
          .map((page, index) => (
            <div
              className="flex items-center cursor-pointer"
              key={index}
              onClick={() => handleNavigate(page)}
            >
              <div className="flex items-center mx-2 hover:scale-110 hover:text-gray-300">
                <p>{iconSwitch(page)}</p>
                <p className="mx-2">{page}</p>
              </div>
              {page !== "Admin" && session?.user?.role === "admin" && <p>|</p>}
              {page !== "Test Data" && session?.user?.role === "user" && (
                <p>|</p>
              )}
            </div>
          ))}
      </div>

      {/* Right Section - User Information and Dropdown */}
      <div className="flex items-center space-x-4">
        {session?.user && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white hover:text-gray-300"
            >
              <div className="flex-container nav-custom">
                {session.user.name || "User"}

                {/* <div className="nav-image greg"></div> */}
              </div>
              <GiHamburgerMenu className="scale-150 ml-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-1 mt-4 w-48 bg-white rounded-md shadow-lg py-1 dropdown-menu">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => signOut()}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
