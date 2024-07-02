"use client";

import React from "react";
import { useState, useEffect } from "react";
import CsvData from "@/app/components/csv-data";
import NewPH from "@/app/components/new-ph";
import NewTSS from "@/app/components/new-tss";

const NewTest = () => {
  const [testType, setTestType] = useState("");

  return (
    <div>
      <div>
        <form>
          <div>
            <label>Test Type:</label>
          </div>
          <div>
            <select
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
        </form>
      </div>

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
  );
};

export default NewTest;
