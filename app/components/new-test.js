"use client";

import React from "react";
import { useState, useEffect } from "react";
import CsvData from "@/app/components/csv-data";
import NewPH from "@/app/components/new-ph";
import NewTSS from "@/app/components/new-tss";
import { SampleIDSelect, TestTypeSelect } from "@/app/components/find-options";
import { getRecord } from "../_services/dbFunctions";
import data from "@/app/objects/result.json";

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

  return (
    <div className="test-container">
      <div className="test-pop px-4">
        <div className="flex justify-center">
          <header className="title">
            <h1>Test Data</h1>
          </header>
        </div>
        <div className="flex justify-between">
          <div className="test-input-pop mt-4 py-4 px-1">
            <form>
              <div className="flex flex-col">
                {/* <div className="flex w-max"> */}
                <div className="test-navbar m-7">
                  <div className="ml-4 font-bold">
                    <label>CoC Search:</label>
                  </div>
                  <SampleIDSelect
                    CocRecord={data}
                    selectedSampleID={selectedSampleID}
                    setSelectedSampleID={setSelectedSampleID}
                  />
                  <TestTypeSelect
                    key={selectedSampleID}
                    CocRecord={data}
                    testType={testType}
                    setTestType={setTestType}
                    selectedSampleID={selectedSampleID}
                  />
                </div>
              </div>
            </form>

            {testType == "PH/Conductivity" && (
              <div>
                <NewPH />
              </div>
            )}
            {testType == "TSS" && (
              <div>
                <NewTSS />
              </div>
            )}
            {(testType == "IC" ||
              testType == "Alkalinity" ||
              testType == "TICTOC" ||
              testType == "ICP") && (
              <div>
                <CsvData testType={testType} />
              </div>
            )}
          </div>
          <div className="test-input-pop mt-4 py-4 px-1">
            <div className="test-navbar m-7">
              <div className="mr-2 font-bold">
                <label>Test Type:</label>
              </div>
              <div>
                <select
                  className="border-2 rounded-lg p-3 bg-slate-400 w-44 h-12 text-center hover:bg-slate-500"
                  id="dropdown"
                  value={testType}
                  onChange={(event) => setTestType(event.target.value)}
                >
                  <option value="">Select a Test</option>
                  <option value="PH/Conductivity">PH/Conductivity</option>
                  <option value="HPIC/IC">HPIC/IC</option>
                  <option value="Alkalinity">Alkalinity</option>
                  <option value="TOCTIC">TOCTIC</option>
                  <option value="ICP">ICP</option>
                  <option value="TSS">TSS</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTest;
