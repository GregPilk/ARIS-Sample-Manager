"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import CsvReader to prevent SSR issues
const CsvReader = dynamic(() => import("./csv-reader"), { ssr: false });

const CsvData = () => {
  const [parsedData, setParsedData] = useState([
    {
      id: "",
      name: "",
      ph: undefined,
      conductivity: undefined,
      hpic: undefined,
      ic: undefined,
      alkalinity: undefined,
      toc: undefined,
      tic: undefined,
      icp: undefined,
      tss: undefined,
      completedBy: "",
      sampleSampleID: undefined,
    },
  ]);

  const [ic, setIc] = useState([
    {
      determinationStart: "",
      identity: "",
      sampleType: "",
      methodName: "",
      user: "",
      infoOne: "",
      anionClCon: "",
      anionSOCon: "",
    },
  ]);

  const [toctic, setToctic] = useState([
    {
      type: "",
      analysis: "",
      sampleName: "",
      sampleID: "",
      resultToc: "",
      resultTc: "",
      resultIc: "",
      resultPoc: "",
      resultNpoc: "",
      resultTn: "",
      unit: "",
      vial: "",
      dateTime: "",
    },
  ]);

  const [alkalinity, setAlkalinity] = useState([
    {
      determinationStart: "",
      methodName: "",
      idOneVal: "",
      rsOneName: "",
      rsOneVal: "",
      rsOneUnit: "",
      sampleSize: "",
      unitVal: "",
      user: "",
      remarks: "",
      rsTwoName: "",
      rsTwoVal: "",
      rsTwoUnit: "",
      rsTwoMean: "",
    },
  ]);

  const handleDataParsed = (csvData, headers) => {
    // const transformedData = csvData.map(row => ({
    //   sampleID: row.sampleID || null,
    //   type: row.type || '',
    //   tests: [{
    //     id: row.testID || '',
    //     name: row.testName || '',
    //     ph: row.ph ? parseInt(row.ph) : null,
    //     conductivity: row.conductivity ? parseInt(row.conductivity) : null,
    //     hpic: row.hpic ? parseInt(row.hpic) : null,
    //     ic: row.ic ? parseInt(row.ic) : null,
    //     alkalinity: row.alkalinity ? parseInt(row.alkalinity) : null,
    //     toc: row.toc ? parseInt(row.toc) : null,
    //     tic: row.tic ? parseInt(row.tic) : null,
    //     icp: row.icp ? parseInt(row.icp) : null,
    //     tss: row.tss ? parseInt(row.tss) : null,
    //     completedBy: row.completedBy || '',
    //     sampleSampleID: row.sampleID ? parseInt(row.sampleID) : null,
    //   }],
    //   recordChainOfCustody: row.recordChainOfCustody ? parseInt(row.recordChainOfCustody) : null,
    // }));

    setParsedData((prevState) => {
      const newState = [...prevState];
      const headerTest = headers[0];
      newState[0].icp = csvData[0][headerTest];
      return newState;
    });
  };

  // const triggerCsvReader = () => {
  //   document.getElementById('csv-file-input').click();
  // };

  return (
    <div>
      {/* <h1>CSV Reader and Data Handler</h1> */}
      {/* <button onClick={triggerCsvReader}>Upload CSV</button> */}
      <CsvReader onDataParsed={handleDataParsed} />
      <input id="csv-file-input" type="file" style={{ display: "none" }} />

      {parsedData.length > 0 && (
        <div className="special-box py-2">
          <h2>Parsed Data</h2>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CsvData;
