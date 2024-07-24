"use client";

import { useState } from "react";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CsvReader = ({ record, sampleID, testType, onDataParsed }) => {
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

    if (resultTestID && type && csvData) {
      onDataParsed(csvData); // Pass the parsed data to parent or callback function
      alert("Data saved to database");
    } else {
      console.error("Missing data: resultTestID, type, or csvData is undefined");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          console.log("Parsed CSV Data:", results.data);
          setCsvData(results.data);
        },
        error: (error) => {
          console.error("Error while parsing CSV file:", error);
        },
      });
    }
  };

  const exportToCSV = () => {
    const csvContent = Papa.unparse(csvData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "updated_data.csv";
    link.click();
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Test Results", 14, 16);
    doc.autoTable({
      head: [Object.keys(csvData[0] || {})],
      body: csvData.map((row) => Object.values(row)),
    });
    doc.save("updated_data.pdf");
  };

  return (
    <div className="flex flex-col mt-4 items-center w-full justify-center">
      <div className="special-box font-bold px-4 py-2">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      {csvData && (
        <div className="flex flex-col items-center">
          <button onClick={handleSubmit} className="add-button m-2">
            Save
          </button>
          <button onClick={exportToCSV} className="add-button m-2">
            Export to CSV
          </button>
          <button onClick={exportToPDF} className="add-button m-2">
            Export to PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default CsvReader;
