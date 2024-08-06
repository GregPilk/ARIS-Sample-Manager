"use client";

import React, { useState, useEffect } from "react";
import CsvReader from "@/app/components/csv-reader";
// import NewPH from "@/app/components/new-ph";
// import NewTSS from "@/app/components/new-tss";
import { NewPH, NewTSS } from "@/app/components/manual-test";
import {
  COCSelect,
  SampleIDSelect,
  TestTypeSelect,
} from "@/app/components/find-options";
import ResultsTable from "@/app/components/results-table";
import OutboundTable from "@/app/components/outbound-table";
import { addTestResult } from "@/app/_services/dbFunctions";
import { formatResultData } from "../_services/dbResultsFormat";

// Created By: Sarah
// Date: 2024-06-10
// Edited By: Greg
// Date: 2024-07-11
// The component will be used for adding new test data to the database
// The component will render different forms based on the selected test type
// The component will also display the test data in a table format

const NewTest = ({ getRecord, getAllRecords }) => {
  const [testType, setTestType] = useState("");
  const [selectedSampleID, setSelectedSampleID] = useState("");
  const [record, setRecord] = useState(null);
  const [outBoundResults, setOutBoundResults] = useState([]);
  const [databaseData, setDatabaseData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showSuccessfulSubmit, setShowSuccessfulSubmit] = useState(false);

  const getTestComponent = (testType) => {
    switch (testType) {
      case "PH/Conductivity":
        return (
          <NewPH
            record={record}
            setOutbound={setOutBoundResults}
            sampleID={selectedSampleID}
          />
        );
      case "TSS":
        return (
          <NewTSS
            record={record}
            setOutbound={setOutBoundResults}
            sampleID={selectedSampleID}
          />
        );
      case "IC":
      case "Alkalinity":
      case "TICTOC":
      case "ICP":
        return <CsvReader setOutbound={setOutBoundResults} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setOutBoundResults([]);
  }, [selectedSampleID, testType, record]);

  useEffect(() => {
    if (!record) {
      setTestType("");
      setSelectedSampleID("");
    }
    // else {
    //   console.log(record);
    // }
  }, [record]);
  useEffect(() => {
    if (showSuccessfulSubmit) {
      const timer = setTimeout(() => {
        setShowSuccessfulSubmit(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessfulSubmit]);

  const handleDatabasePackage = async (data) => {
    const containsPhOrTSS = data.some(
      (item) =>
        Object.keys(item).some(
          (key) => key.includes("Ph") || key.includes("TSS")
        ) ||
        Object.values(item).some(
          (value) =>
            value.includes && (value.includes("Ph") || value.includes("TSS"))
        )
    );

    if (containsPhOrTSS) {
      const processedData = data.map((item) => {
        const resultTypeKey = Object.keys(item).find((key) =>
          key.endsWith("Results")
        );
        const resultType = resultTypeKey.replace("Results", "") + "Result";
        const { testID, [resultTypeKey]: _, ...resultData } = item;

        return {
          testID,
          resultType,
          resultData,
        };
      });
      // console.log(processedData);
      await addUserResults(processedData);
    } else {
      const type = `${testType}Result`;

      let resultTestID = null;
      record.samples.forEach((sample) => {
        if (sample.sampleID === selectedSampleID) {
          sample.tests.forEach((test) => {
            if (test.name === testType) {
              resultTestID = test.id;
            }
          });
        }
      });

      // Check if resultTestID and type are defined before proceeding
      if (resultTestID && type && data) {
        formatResultData(data, resultTestID, type);
        // alert("Data saved to database");
      } else {
        console.error(
          "Missing data: resultTestID, type, or csvData is undefined"
        );
      }
    }

    setShowSuccessfulSubmit(true);
    // alert("Data submitted successfully");
    await refreshRecord();
  };

  const refreshRecord = async () => {
    const tempSampleID = selectedSampleID;
    const tempTestType = testType;

    const recordData = await getRecord(record.chainOfCustody);
    setRecord(recordData);

    setSelectedSampleID(tempSampleID);
    setTestType(tempTestType);

    setRefreshKey((prevKey) => prevKey + 1);
  };

  const addUserResults = async (databaseData) => {
    for (const item of databaseData) {
      try {
        // console.log("this is the item", item);
        await addTestResult(item.testID, item.resultType, item.resultData);
        // console.log("Test result added to database");
      } catch (error) {
        console.error("Failed to add test result:", error);
        throw error;
      }
    }
  };

  const updateRecords = (index, newRecord) => {
    const updatedResults = [...outBoundResults];
    updatedResults[index] = newRecord;
    setOutBoundResults(updatedResults);
  };

  return (
    <div className="test-container">
      <div className="test-pop px-4">
        <div className="flex justify-center">
          <header className="title">
            <h1>Test Data</h1>
          </header>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="test-input-pop mt-4 mb-8 py-4 px-1">
            <form>
              <div className="flex flex-col">
                <div className="test-navbar m-7">
                  <COCSelect
                    getRecord={getRecord}
                    getAllRecords={getAllRecords}
                    setRecord={setRecord}
                  />
                  <SampleIDSelect
                    CocRecord={record}
                    selectedSampleID={selectedSampleID}
                    setSelectedSampleID={setSelectedSampleID}
                  />
                  <TestTypeSelect
                    key={selectedSampleID}
                    CocRecord={record}
                    testType={testType}
                    setTestType={setTestType}
                    selectedSampleID={selectedSampleID}
                  />
                </div>
              </div>
            </form>

            <div>{getTestComponent(testType)}</div>
          </div>
          {/* output */}
          <div className="test-input-pop mt-4 py-4 px-1">
            <div className="test-navbar m-7">
              <SampleIDSelect
                key={record}
                CocRecord={record}
                selectedSampleID={selectedSampleID}
                setSelectedSampleID={setSelectedSampleID}
              />
              <TestTypeSelect
                key={selectedSampleID}
                CocRecord={record}
                testType={testType}
                setTestType={setTestType}
                selectedSampleID={selectedSampleID}
              />
            </div>
            <div className="flex flex-col">
              <ResultsTable
                key={refreshKey}
                record={record}
                selectedSampleType={selectedSampleID}
                selectedTestType={testType}
              />
              <OutboundTable
                records={outBoundResults}
                selectedTestType={testType}
                updateRecords={updateRecords}
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="submit-button"
                  onClick={() => handleDatabasePackage(outBoundResults)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Success */}
      <div
        className={`fixed inset-x-0 bottom-0 flex justify-center transition-transform duration-300 ease-in-out transform ${
          showSuccessfulSubmit ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-green-700 paper text-white max-h-10 w-1/4 flex justify-center items-center rounded-t-md">
          <ul className="text-white text-xl py-2">
            Successfully Submitted Data
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewTest;
