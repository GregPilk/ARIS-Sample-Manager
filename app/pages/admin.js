"use client";
import { useState } from "react";
import ChangeRequest from "../components/change-request";
import AddUser from "../components/add-user";
import { getRecord, getAllRecords } from "../_services/dbFunctions";
import EditTest from "../components/edit-test";
import NewTest from "../components/new-test";

export default function AdminPage({changeReq}) {
  const[changeAccept, setAccept] = useState(changeReq);
  // const[cocID, setCoC] = useState();
  // const[sampleId, setSampleID] = useState();
  // const[changedResult, setChanged] = useState();
  // const[prevResult, setPrevious] = useState();
  // const[typeOfTest, setTest] = useState();
  const[requestObject, setRequest] = useState({});

  const [testChangeRequest, setTestChangeRequest] = useState([
    {
      id: 1,
      chainOfCustody: "Chain 1",
      sampleID: "Sample 1",
      previousResult: "12",
      changedResult: "10",
      testType: "PH/Conductivity",
      results:{
        resultID: "66a79e4f9e36b15dd16fbc93",
        ph: "12",
        conductivity: "142",
      },
    },
    {
      id: 2,
      chainOfCustody: "Chain 2",
      sampleID: "Sample 2",
      previousResult: "542",
      changedResult: "123",
      testType: "TSS",
      results:{
        resultID:"66a7b4d7d5b048e1ae223061",
        tssInMgl: "542",
      },
    },
  ]);

  const handleAccept = (req) => {
    console.log(`Accepted request with ID: ${req.id}`);
    // Implement acceptance logic here
    // setCoC(req.chainOfCustody);
    // setSampleID(req.sampleID);
    // setPrevious(req.previousResult);
    // setChanged(req.changedResult);
    // setTest(req.testType);

    setRequest(req);

    setAccept(true);
  };

  const handleReject = (id) => {
    console.log(`Rejected request with ID: ${id}`);
    // Implement rejection logic here
  };

  return (
    <div className="page-container">
      {changeAccept == false && (
        <div>
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
                <AddUser />
              </div>
            </div>
          </div>
        </div>
      )}
      {changeAccept == true &&(
        <div>
          <EditTest requestData={requestObject}/>
        </div>
      )}
    </div>
  );
}
