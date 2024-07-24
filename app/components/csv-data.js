"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import CsvReader to prevent SSR issues
const CsvReader = dynamic(() => import("./csv-reader"), { ssr: false });

const CsvData = ({ testType }) => {
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    setParsedData([]);
  }, [testType]);

  const handleDataParsed = (csvData) => {
    let newData = [];
    if (testType === "Alkalinity") {
      newData = csvData.map((data) => ({
        determinationStart: data["Determination start"] || "",
        methodName: data["Method name"] || "",
        idOneVal: data["ID1.Value"] || "",
        rsOneName: data["RS01.Name"] || "",
        rsOneVal: data["RS01.Value"] || "",
        rsOneUnit: data["RS01.Unit"] || "",
        sampleSize: data["Sample size.Value"] || "",
        unitVal: data["Unit.Value"] || "",
        user: data["User (short name)"] || "",
        remarks: data["Remarks"] || "",
        rsTwoName: data["RS02.Name"] || "",
        rsTwoVal: data["RS02.Value"] || "",
        rsTwoUnit: data["RS02.Unit"] || "",
        rsTwoMean: data["RS02.Mean value"] || "",
      }));
    } else if (testType === "TOCTIC") {
      newData = csvData.map((data) => ({
        type: data["Type"],
        analysis: data["Anal."],
        sampleName: data["Sample Name"],
        sampleID: data["Sample ID"],
        resultToc: data["Result(TOC)"],
        resultTc: data["Result(TC)"],
        resultIc: data["Result(IC"],
        resultPoc: data["Result(POC)"],
        resultNpoc: data["Result(NPOC)"],
        resultTn: data["Result(TN)"],
        unit: data["Unit"],
        vial: data["Vial"],
        dateTime: data["Date / Time"],
      }));
    } else if (testType === "HPIC/IC") {
      newData = csvData.map((data) => ({
        determinationStart: data["Determination start"],
        identity: data["Ident"],
        sampleType: data["Sample type"],
        methodName: data["Method name"],
        user: data["User (short name)"],
        infoOne: data["Info 1"],
        anionClCon: data["Anions.Chloride.Concentration"],
        anionSOCon: data["Anions.Sulfate.Concentration"],
      }));
    }

    setParsedData(newData);
  };

  return (
    <div className="flex flex-col items-center justify-center my-5">
      <CsvReader testType={testType} onDataParsed={handleDataParsed} />
    </div>
  );
};

export default CsvData;
