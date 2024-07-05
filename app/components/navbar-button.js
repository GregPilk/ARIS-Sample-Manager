import React from "react";
import { FaFlaskVial } from "react-icons/fa6";
import { HiDocumentSearch } from "react-icons/hi";
import { FaElementor } from "react-icons/fa";

export default function NavigationLink({ page, onNavigate }) {
  var icon;
  switch (page) {
    case "New Sample":
      icon = <FaFlaskVial className="text-6xl mr-4" />;
      break;
    case "Find Sample":
      icon = <HiDocumentSearch className="text-6xl mr-4" />;
      break;
    case "New Test":
      icon = <FaElementor className="text-6xl mr-4" />;
      break;
    case "Find Test":
      icon = <HiDocumentSearch className="text-6xl mr-4" />;
      break;
    default:
      icon = null;
  }

  return (
    <div className="flex hover:text-gray-300 items-center space-x-1 hover:scale-110 cursor-pointer">
      <button onClick={onNavigate}>
        <div className="flex items-center h-4">
          <p>{icon}</p>
          <p className="mx-2">{page}</p>
          <p> | </p>
        </div>
      </button>
    </div>
  );
}
