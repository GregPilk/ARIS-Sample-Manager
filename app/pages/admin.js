"use client";
import { useState, useEffect } from "react";
import ChangeRequest from "../components/change-request";
import AddUser from "../components/add-user";
import { getRecord, getAllRecords } from "../_services/dbFunctions";
import EditTest from "../components/edit-test";
import NewTest from "../components/new-test";
import { updateTestResult } from "../_services/dbFunctions";

export default function AdminPage() {
  const[changeAccept, setAccept] = useState(false);
  const[resultType, setResultType] = useState();
  const[requestObject, setRequest] = useState({});

  const [testChangeRequest, setTestChangeRequest] = useState([
    {
      id: 1,
      chainOfCustody: "Chain 3",
      sampleID: "Sample 1",
      previousResults: {
        ph: "100",
        conductivity: "123",
      },
      changedResult: "10",
      testType: "PH/Conductivity",
      results:{
        resultID: "66a79e4f9e36b15dd16fbc93",
        ph: "100",
        conductivity: "123",
      },
      newResults:{
        ph:"10",
        conductivity: "321",
      }
    },
    {
      id: 2,
      chainOfCustody: "Chain 2",
      sampleID: "Sample 2",
      previousResults: {
        tssInMgl: "123",
      },
      changedResult: "542",
      testType: "TSS",
      results:{
        resultID:"66a7b4d7d5b048e1ae223061",
        tssInMgl: "123",
      },
      newResults:{
        tssInMgl:"542",
      }
    },
  ]);

  useEffect(() =>{
    console.log("Use Effect");
    switch(requestObject.testType){
      case "TSS":
        setResultType("TSSResult");
        break;
      case "PH/Conductivity":
        setResultType("PhConResult");
        break;
      case "TICTOC":
        setResultType("TICTOCResult");
        break;
      case "Alkalinity":
        setResultType("AlkalinityResult");
        break;
      case "IC":
        setResultType("ICResult");
        break;
    }
  }, [requestObject]);

  const handleEditChange =()=>{
    try{
      updateTestResult(requestObject.results.resultID, resultType, requestObject.newResults);
      console.log('Data Edit Success');
    }
    catch(error){
      console.log(`Failure: ${error}`);
    }
  }

  const handleAccept = (req) => {
    console.log(`Accepted request with ID: ${req.id}`);
    setRequest(req);
    setAccept(true);
  };

  const handleReject = (id) => {
    console.log(`Rejected request with ID: ${id}`);
    // Implement rejection logic here
  };

  return (
    <div className="page-container">
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
              {changeAccept === true &&(
                <div>
                  <div>
                    <EditTest requestData={requestObject}/>
                    <div>
                      <button className="submit-button" type="submit" onClick={() => handleEditChange()}>Submit</button>
                    </div>
                  </div>
                </div>
              )}
              <AddUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
