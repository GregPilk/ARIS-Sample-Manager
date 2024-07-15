import React from "react";
import { FaFlaskVial } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";
import { FaElementor } from "react-icons/fa";

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
    default:
      icon = null;
  }

  return (
    <div className="page-button">
      <button onClick={onClick}>
        <div className="flex items-center">
          <p className="">{icon}</p>
          <p className="">{page}</p>
        </div>
      </button>
    </div>
  );
}
