"use client";
import { useState } from "react";
import Navbar from "../components/navbar";
import PageButton from "../components/page-button";
import Link from "next/link";

export default function AdminPage() {
  const [testChangeRequest, setTestChangeRequest] = useState([]);
  const [testChangeApproval, setTestChangeApproval] = useState([]);
  const [selectedPageType, setSelectedPageType] = useState(null);

  return (
    <div className="page-container">
      <div className="page-pop px-16">
        <div className="flex justify-center">
          <header className="title">
            <h1>Admin</h1>
          </header>
        </div>
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
}
