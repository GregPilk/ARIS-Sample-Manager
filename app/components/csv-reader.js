"use client";

import { useState } from "react";
import Papa from "papaparse";
import { formatResultData } from "../_services/dbResultsFormat";

const CsvReader = ({ record, sampleID, testType }) => {
  const [csvData, setCsvData] = useState(null);

  const handleSubmit = () => {
    const type = `${testType}Result`;

    let resultTestID = null;
    record.samples.forEach((sample) => {
      if (sample.sampleID === sampleID) {
        sample.tests.forEach((test) => {
          if (test.name === testType) {
            resultTestID = test.id;
          }
        });
      }
    });

    // Check if resultTestID and type are defined before proceeding
    if (resultTestID && type && csvData) {
      formatResultData(csvData, resultTestID, type);
      alert("Data saved to database");
    } else {
      console.error(
        "Missing data: resultTestID, type, or csvData is undefined"
      );
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("Parsed CSV Data:", results.data); // Log parsed data
          setCsvData(results.data);
        },
        error: (error) => {
          console.error("Error while parsing CSV file:", error);
        },
      });
    }
  };

  return (
    <div className="flex flex-col mt-4 items-center w-full justify-center">
      <div className="special-box font-bold px-4 py-2">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      {csvData && (
        <div className="flex justify-center">
          <button onClick={handleSubmit} className="add-button">
            Save
          </button>
          {/* <h3>Preview</h3> */}
          {/* <pre>{JSON.stringify(csvData, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
};

export default CsvReader;
