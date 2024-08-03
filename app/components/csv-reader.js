"use client";

import { useState } from "react";
import Papa from "papaparse";
import { formatResultData } from "../_services/dbResultsFormat";

// Added by: Ryan and Sarah
// Date: 2024-06-30
// This component is used to read a CSV file and save the data to the database.
// Edited by: Nick
// Date: 2024-07-16

const CsvReader = ({ setOutbound }) => {
  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          // console.log("Parsed CSV Data:", results.data); // Log parsed data
          setCsvData(results.data);
        },
        error: (error) => {
          console.error("Error while parsing CSV file:", error);
        },
      });
    }
  };

  const handleSave = () => {
    if (csvData) {
      // Filter out blank rows
      const filteredData = csvData.filter((row) => {
        // Check if all values in the row are empty strings
        return Object.values(row).some((value) => value.trim() !== "");
      });

      setOutbound(filteredData);
    } else {
      console.error("CSV data is undefined");
    }
  };

  return (
    <div className="flex flex-col mt-4 items-center w-full justify-center">
      <div className="special-box font-bold px-4 py-2">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      {csvData && (
        <div className="flex justify-center">
          <button onClick={handleSave} className="add-button">
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
