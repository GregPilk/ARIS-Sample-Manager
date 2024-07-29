"use client";
import { useState } from "react";
import ChangeRequest from "../components/change-request";
import AddUser from "../components/add-user";
import DeleteUser from "../components/delete-user";

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
      <div className="admin-pop px-16">
        <div className="flex justify-center">
          <header className="title">
            <h1>Admin</h1>
          </header>
        </div>
        <div className="flex mt-8">
          <div className="mr-4 admin-info paper">
            <h2 className="text-2xl py-2 font-bold">More Information</h2>
            {/* Mock information */}
            <ul className="list-none mt-2">
              <li>
                <strong>Total Users:</strong> 150
              </li>
              <li>
                <strong>Pending Requests:</strong> 25
              </li>
              <li>
                <strong>System Status:</strong> Operational
              </li>
              <li>
                <strong>Last Backup:</strong> 2024-07-20 14:35
              </li>
              <li>
                <strong>Active Sessions:</strong> 45
              </li>
              <li>
                <strong>Recent Logins:</strong>
                <ul className="list-none pl-5 mt-1">
                  <li>user1@example.com - 2024-07-21 09:15</li>
                  <li>user2@example.com - 2024-07-21 08:45</li>
                  <li>user3@example.com - 2024-07-21 08:30</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="flex flex-col w-full">
            <ChangeRequest
              requests={testChangeRequest}
              onAccept={handleAccept}
              onReject={handleReject}
            />
            <div className="admin-table-pop px-4 mt-4">
            <div className="flex justify-between">
            <div className="w-1/2 p-2">
          <AddUser />
        </div>
        <div className="w-1/2 p-2">
          <DeleteUser />
        </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
