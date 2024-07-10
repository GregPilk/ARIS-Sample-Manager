"use client";

import React from "react";
import { useState, useEffect } from "react";
import CsvData from "@/app/components/csv-data";
import NewPH from "@/app/components/new-ph";
import NewTSS from "@/app/components/new-tss";

const NewTest = () => {
  const [testType, setTestType] = useState("");

  return (
    <div className="page-container">
      <div className="page-pop px-16">
        <div className="flex justify-center">
          <header className="title">
            <h1>Sample-SampleNO.-New Test</h1>
          </header>
        </div>
        <form>
          <div className="flex flex-col">
            {/* <div className="flex w-max"> */}
            <div className="subnav-bar m-7">
              <div className="mr-4 font-bold">
                <label>Test Type:</label>
              </div>
              <div>
                <select
                  className="border-2 rounded-lg p-3 bg-slate-400 w-52 h-12 text-center hover:bg-slate-500"
                  id="dropdown"
                  value={testType}
                  onChange={(event) => setTestType(event.target.value)}
                >
                  <option value="">Select a Test Type</option>
                  <option value="PH Conductivity">PH Conductivity</option>
                  <option value="HPIC/IC">HPIC/IC</option>
                  <option value="Alkalinity">Alkalinity</option>
                  <option value="TOCTIC">TOCTIC</option>
                  <option value="ICP">ICP</option>
                  <option value="TSS">TSS</option>
                </select>
              </div>
              {/* </div> */}
            </div>
          </div>
        </form>

        {testType == "PH Conductivity" && (
          <div>
            <NewPH />
          </div>
        )}
        {testType == "TSS" && (
          <div>
            <NewTSS />
          </div>
        )}
        {(testType == "HPIC/IC" ||
          testType == "Alkalinity" ||
          testType == "TOCTIC" ||
          testType == "ICP") && (
          <div>
            <CsvData testType={testType} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewTest;
