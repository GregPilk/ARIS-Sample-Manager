"use client";
import { useState, useEffect } from "react";
import ChangeRequest from "../components/change-request";
import EditTest from "../components/edit-test";
import { updateTestResult } from "../_services/dbFunctions";
import ControlUser from "../components/control-user";
import { getAllUsers } from "../_services/dbFunctions";
import { getAllSamples } from "../_services/dbFunctions";
import { getAllRecords } from "../_services/dbFunctions";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const [changeAccept, setAccept] = useState(false);
  const [resultType, setResultType] = useState();
  const [requestObject, setRequest] = useState({});
  const [users, setUsers] = useState([]);
  const [samples, setSamples] = useState([]);
  const [records, setRecords] = useState({});
  const [samplesTests, setSamplesTests] = useState("");
  const { data: session } = useSession();

  const [testChangeRequest, setTestChangeRequest] = useState([
    {
      id: 1,
      chainOfCustody: "Chain 3",
      sampleID: "Sample 1",
      previousResult: "100",
      changedResult: "10",
      testType: "PH/Conductivity",
      results: {
        resultID: "66aad952e7b241e46f354da5",
        ph: "100",
        conductivity: "123",
      },
      newResults: {
        ph: "10",
        conductivity: "321",
      },
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
      results: {
        resultID: "66a7b4d7d5b048e1ae223061",
        tssInMgl: "123",
      },
      newResults: {
        tssInMgl: "542",
      },
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

  const fetchusers = async () => {
    const result = await getAllUsers();
    setUsers(result);
  };

  const fetchSamples = async () => {
    const result = await getAllSamples();
    setSamples(result);
  };

  const fetchRecords = async () => {
    const result = await getAllRecords();
    setRecords(result);
  };

  const fetchSamplesTests = async () => {
    setSamplesTests(0);
    const samples = await getAllSamples();
    let count = 0;

    samples.forEach((sample) => {
      sample.tests.forEach((test) => {
        if (test.PhConResult == null) {
          count++;
        }
      });
    });

    setSamplesTests(count);
  };

  useEffect(() => {
    setSamplesTests(0);
    fetchusers();
    fetchSamples();
    fetchRecords();
    fetchSamplesTests();
    switch (requestObject.testType) {
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

  const handleEditChange = () => {
    try {
      updateTestResult(
        requestObject.results.resultID,
        resultType,
        requestObject.newResults
      );
      setTestChangeRequest((prevRequests) =>
        prevRequests.filter((req) => req.id !== requestObject.id)
      );
      setAccept(false);
    } catch (error) {}
  };

  const handleCancelChange = () => {
    setAccept(false);
  };

  const handleAccept = (req) => {
    setRequest(req);
    setAccept(true);
  };

  const handleReject = (id) => {
    // Implement rejection logic here
    //Deletion is temporary at the moment, will come back when page is refreshed
    setTestChangeRequest((prevRequests) =>
      prevRequests.filter((req) => req.id !== id)
    );
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
            <h2 className="text-2xl py-2 font-bold text-center">
              More Information
            </h2>
            <div className="ml-6">
              <table className="table-auto mt-2">
                <tbody>
                  <tr className="mb-2 odd:bg-gray-200">
                    <td className="pr-4 font-bold">System Status:</td>
                    <td className="pr-2">Operational</td>
                  </tr>
                  <tr className="mb-2 odd:bg-gray-200">
                    <td className="pr-4 font-bold">Total Users:</td>
                    <td>{users.length}</td>
                  </tr>
                  <tr className="mb-2 odd:bg-gray-200">
                    <td className="pr-4 font-bold">
                      Total Chain of Custodies:
                    </td>
                    <td>{records.length}</td>
                  </tr>
                  <tr className="mb-2 odd:bg-gray-200">
                    <td className="pr-4 font-bold">Total Samples:</td>
                    <td>{samples.length}</td>
                  </tr>
                  <tr className="mb-2 odd:bg-gray-200">
                    <td className="pr-4 font-bold">Total tests:</td>
                    <td>{samplesTests}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col w-full">
            {/* <ChangeRequest
              requests={testChangeRequest}
              onAccept={handleAccept}
              onReject={handleReject}
            />
            {changeAccept === true && (
              <div>
                <div>
                  <EditTest requestData={requestObject} />
                  <div>
                    <button
                      className="submit-button"
                      type="submit"
                      onClick={() => handleEditChange()}
                    >
                      Submit
                    </button>
                    <button
                      className="submit-button"
                      type="submit"
                      onClick={() => handleCancelChange()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )} */}
            <div className="">
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
                  Update User
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
