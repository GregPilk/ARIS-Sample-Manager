"use client";
import { useState } from "react";
import ChangeRequest from "../components/change-request";
import AddUser from "../components/add-user";

export default function AdminPage() {
  const [testChangeRequest, setTestChangeRequest] = useState([
    {
      id: 1,
      chainOfCustody: "Chain 1",
      sampleID: "Sample 1",
      previousResult: "Negative",
      changedResult: "Positive",
    },
    {
      id: 2,
      chainOfCustody: "Chain 2",
      sampleID: "Sample 2",
      previousResult: "Positive",
      changedResult: "Negative",
    },
  ]);

  const handleAccept = (id) => {
    console.log(`Accepted request with ID: ${id}`);
    // Implement acceptance logic here
  };

  const handleReject = (id) => {
    console.log(`Rejected request with ID: ${id}`);
    // Implement rejection logic here
  };

  return (
    <div className="page-container">
      <div className="page-pop px-16">
        <div className="flex justify-center">
          <header className="title">
            <h1>Admin</h1>
          </header>
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-4 input-box hover:bg-slate-400 paper">
            <p>More Information</p>
          </div>
          <ChangeRequest
            requests={testChangeRequest}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        </div>
        <div className="flex  mt-1 justify-center items-center">
          <div className="mr-4 mt-1 input-box hover:bg-slate-400 paper">
            <p>More Information</p>
          </div>
          <AddUser />
        </div>
      </div>
    </div>
  );
}
