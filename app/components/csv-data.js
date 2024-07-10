"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import CsvReader to prevent SSR issues
const CsvReader = dynamic(() => import('./csv-reader'), { ssr: false });

const CsvData = ({ testType }) => {
  //useState for parsed data, contains all the fields needed for each test.
  const [parsedData, setParsedData] = useState([{
    id: "",
    name: "",
    phConduct: [{
      temperature: undefined,
      sampleId: "",
      phLevel: undefined,
      conductivity: undefined
    }],
    hpicIc: [{
      determinationStart: "",
      identity: "",
      sampleType: "",
      methodName: "",
      user: "",
      infoOne: "",
      anionClCon: "",
      anionSOCon: ""
    }],
    alkalinity: [{
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
      rsTwoMean: ""
    }],
    toctic: [{
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
      dateTime: ""
    }],
    icp: [{
      
    }],
    tss: [{
      sampleID: "",
      tssLevel: ""
    }],
    completedBy: "",
    sampleSampleID: undefined
  }]);

  //function used to update the parsedData useState with new data sets
  const DataSet = (dataSet) => {
    setParsedData(prevData => {
      const updatedData = [...prevData];
      //iterates over new data set and pushes it to the updatedData array
      dataSet.forEach((data, index) => {
        //if statements checks to see which type of test was selected
        if(testType === "Alkalinity"){
          updatedData.push({
            id: "",
            name: "",
            phConduct: [{}],
            hpicIc: [{}],
            alkalinity: [data],
            toctic: [{}],
            icp: [{}],
            tss: [{}],
            completedBy: "",
            sampleSampleID: undefined
          });        
        }
        else if(testType === "TOCTIC"){
          updatedData.push({
            id: "",
            name: "",
            phConduct: [{}],
            hpicIc: [{}],
            alkalinity: [{}],
            toctic: [data],
            icp: [{}],
            tss: [{}],
            completedBy: "",
            sampleSampleID: undefined
          });    
        }
        else if(testType === "HPIC/IC"){
          updatedData.push({
            id: "",
            name: "",
            phConduct: [{}],
            hpicIc: [data],
            alkalinity: [{}],
            toctic: [{}],
            icp: [{}],
            tss: [{}],
            completedBy: "",
            sampleSampleID: undefined
          });
        }
        //add else if for icp after meeting with client.
      });
      return updatedData;
    });
  }

  //function to handle the data from the csv reader
  const handleDataParsed = (csvData, headers) => {
    //sets the data from the csv reader to javascript objects based on the test type
    if (testType === "Alkalinity") {
      const newAlkalinityData = csvData.map((data) => ({
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
      
      //calls DataSet function to set the data above to the useState
      DataSet(newAlkalinityData);

    }
    else if(testType === "TOCTIC"){
      const newTocTicData = csvData.map((data) => ({
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
        dateTime: data["Date / Time"]
      }))

      DataSet(newTocTicData);

    }
    else if(testType === "HPIC/IC"){
      const newHpicIc = csvData.map((data) => ({
        determinationStart: data["Determination start"],
        identity: data["Ident"],
        sampleType: data["Sample type"],
        methodName: data["Method name"],
        user: data["User (short name)"],
        infoOne: data["Info 1"],
        anionClCon: data["Anions.Chloride.Concentration"],
        anionSOCon: data["Anions.Sulfate.Concentration"]
      }))

      DataSet(newHpicIc);

    }
  };

  return (
    <div>
      <h1>CSV Reader and Data Handler</h1>
      <CsvReader onDataParsed={handleDataParsed} />
      {/* Test to see if data is in the correct object */}
      {parsedData.length > 0 && (
        <div>
          <h2>Parsed Data</h2>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CsvData;
