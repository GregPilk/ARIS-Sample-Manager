"use client";

import React from "react";
import { useState, useEffect } from "react";
import CsvData from "@/app/components/csv-data";
import NewPH from "@/app/components/new-ph";
import NewTSS from "@/app/components/new-tss";
import {
  COCSelect,
  SampleIDSelect,
  TestTypeSelect,
} from "@/app/components/find-options";
import ResultsTable from "@/app/components/results-table";
import OutboundTable from "@/app/components/outbound-table";
import { getRecord, getAllRecords } from "../_services/dbFunctions";
import data from "@/app/objects/result.json";
import { set } from "mongoose";

// Created By: Sarah
// Date: 2024-06-10
// Edited By: Greg
// Date: 2024-07-11
// The component will be used for adding new test data to the database
// The component will render different forms based on the selected test type
// The component will also display the test data in a table format

const NewTest = () => {
  const [testType, setTestType] = useState("");
  const [selectedSampleID, setSelectedSampleID] = useState("");
  const [record, setRecord] = useState(null);
  const [outBoundResults, setOutBoundResults] = useState([]);

  const getTestComponent = (testType) => {
    switch (testType) {
      case "PH/Conductivity":
        return <NewPH record={record} setOutbound={setOutBoundResults} />;
      case "TSS":
        return <NewTSS record={record} setOutbound={setOutBoundResults} />;
      case "IC":
      case "Alkalinity":
      case "TICTOC":
      case "ICP":
        return <CsvData testType={testType} />;
      default:
        return null;
    }
  };
  useEffect(() => {
    setOutBoundResults([]);
  }, [testType]);

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
                    setRecord={setRecord} // Pass setRecord down to COCSelect
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
              <ResultsTable record={record} selectedTestType={testType} />
              <OutboundTable
                records={outBoundResults}
                selectedTestType={testType}
              />
              <div className="flex justify-center">
                <button type="submit" className="submit-button">
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
