"use client";
import { useState } from "react";
import ChangeRequest from "../components/change-request";
// import AddUser from "../components/add-user";
// import DeleteUser from "../components/delete-user";
import ControlUser from "../components/control-user";

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
    {
      id: 3,
      chainOfCustody: "Chain 3",
      sampleID: "Sample 3",
      previousResult: "Positive",
      changedResult: "Negative",
    },
    {
      id: 4,
      chainOfCustody: "Chain 4",
      sampleID: "Sample 4",
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
  const [activeTab, setActiveTab] = useState("add");

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

            <div className="mt-8">
              <div className="tabs">
                <button
                  className={`tab paper ${activeTab === "add" ? "active" : ""}`}
                  onClick={() => setActiveTab("add")}
                >
                  Add User
                </button>
                <button
                  className={`tab paper ${
                    activeTab === "delete" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("delete")}
                >
                  Delete User
                </button>
                <button
                  className={`tab paper ${
                    activeTab === "edit" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("edit")}
                >
                  Edit User
                </button>
              </div>
              <div className="tab-content w-full p-2">
                {activeTab === "add" && <ControlUser type="add" />}
                {activeTab === "delete" && <ControlUser type="delete" />}
                {activeTab === "edit" && <ControlUser type="edit" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
