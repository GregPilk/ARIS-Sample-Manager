import React from "react";
import { FaFlaskVial } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";
import { FaElementor } from "react-icons/fa";
import { FaBattleNet } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

// Added by: Greg
// Date: 2024-07-10
// This component is used to display a button that navigates to a specific component.

export default function PageButton({ page, onClick }) {
  var icon;
  switch (page) {
    case "New Chain of Custody":
      icon = <FaFlaskVial className="text-6xl mr-4" />;
      break;
    case "Find Chain of Custody":
      icon = <HiDocumentSearch className="text-6xl mr-4" />;
      break;
    case "Test Data":
      icon = <FaElementor className="text-6xl mr-4" />;
      break;
    // case "Find Test":
    //   icon = <HiDocumentSearch className="text-6xl mr-4" />;
    //   break;
    case "Admin":
      icon = <MdAdminPanelSettings className="text-6xl mr-4" />;
      break;
    default:
      icon = null;
  }

  return (
    <div className="page-button">
      <button className="w-full " onClick={onClick}>
        <div className="flex justify-between items-center">
          <p className="">{icon}</p>
          <p className="pr-2">{page}</p>
          <p className=""></p>
        </div>
      </button>
    </div>
  );
}
