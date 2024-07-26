"use client";

import React from "react";
import { useState, useEffect } from "react";
import CsvReader from "@/app/components/csv-reader";
import NewPH from "@/app/components/new-ph";
import NewTSS from "@/app/components/new-tss";
import ManualTest from "@/app/components/manual-test";
import {
  COCSelect,
  SampleIDSelect,
  TestTypeSelect,
} from "@/app/components/find-options";
import ResultsTable from "@/app/components/results-table";
import OutboundTable from "@/app/components/outbound-table";
// import { getRecord, getAllRecords } from "../_services/dbFunctions";
import data from "@/app/objects/result.json";
import { set } from "mongoose";
import { addTestResult } from "@/app/_services/dbFunctions";

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
  // const [recordReload, setRecordReload] = useState(false);

  const getTestComponent = (testType) => {
    switch (testType) {
      //This would be used if we refactor the manual test component to be more generic
      // case "PH/Conductivity":
      // case "TSS":
      //   return (
      //     <ManualTest
      //       record={record}
      //       setOutbound={setOutBoundResults}
      //       sampleID={selectedSampleID}
      //       testType={testType}
      //     />
      //   );
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
        return (
          <CsvReader
            record={record}
            sampleID={selectedSampleID}
            testType={testType}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setOutBoundResults([]);
  }, [selectedSampleID, testType, record]);

  useEffect(() => {
    setTestType("");
  }, [selectedSampleID, record]);
  useEffect(() => {
    setSelectedSampleID("");
  }, [record]);

  const handleDatabasePackage = async (data) => {
    const processedData = data.map((item) => {
      // Find the result type key
      const resultTypeKey = Object.keys(item).find((key) =>
        key.endsWith("Results")
      );
      // Construct the resultType string
      const resultType = resultTypeKey.replace("Results", "") + "Result";
      // Destructure to separate testID, resultTypeKey, and the rest of the data
      const { testID, [resultTypeKey]: _, ...resultData } = item;

      return {
        testID,
        resultType,
        resultData,
      };
    });
    console.log(processedData);
    // Call the function to add the data to the database with processedData
    await addUserResults(processedData);
    // setRecordReload(true);
    alert("Data submitted successfully");
  };

  const addUserResults = async (databaseData) => {
    for (const item of databaseData) {
      try {
        console.log("this is the item", item);
        await addTestResult(item.testID, item.resultType, item.resultData);
        console.log("Test result added to database");
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
    </div>
  );
};

export default NewTest;
