"use client";

import React, { useState } from "react";
import Papa from "papaparse";

const CsvReader = ({ onDataParsed }) => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const parsedData = Papa.parse(content, { header: true });
        setCsvData(parsedData.data);
        setHeaders(parsedData.meta.fields);
        onDataParsed(parsedData.data, parsedData.meta.fields); // Pass parsed data to parent
      };
      reader.readAsText(file);
    }
  };

  const handleInputChange = (value, rowIndex, columnName) => {
    const newData = [...csvData];
    newData[rowIndex][columnName] = value;
    setCsvData(newData);
  };

  const saveCSV = () => {
    const csvContent = Papa.unparse(csvData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modified_data.csv";
    link.click();
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {csvData.length > 0 && (
        <div>
          {csvData.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", marginBottom: 10 }}>
              {headers.map((header, colIndex) => (
                <input
                  key={colIndex}
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 5,
                    flex: 1,
                    marginRight: 10,
                  }}
                  value={row[header]}
                  onChange={(e) =>
                    handleInputChange(e.target.value, rowIndex, header)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      )}
      {csvData.length > 0 && <button onClick={saveCSV}>Save CSV</button>}
    </div>
  );
};

export default CsvReader;
