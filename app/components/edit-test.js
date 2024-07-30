"use client";

import { useState } from "react";
import { COCSelect, SampleIDSelect, TestTypeSelect } from "./find-options";
import { getRecord, getAllRecords } from "../_services/dbFunctions";
import AdminPage from "../pages/admin";
import { updateCoCTestResult } from "../_services/dbFunctions";

export default function EditTest({requestData}){
    const[editCoC, setEditCoC] = useState(requestData.chainOfCustody);
    const[editSampleID, setSampleID] = useState(requestData.sampleID + 1);
    const[previousResult, setEditTest] = useState(requestData.previousResult);
    const[changedResult, setChanged] = useState(requestData.changedResult);
    const[testType, setType] = useState(requestData.testType);
    const[resultId, setResultID] = useState(requestData.results.resultID);
    const[resultType, setResultType] = useState("");

    const handleEditChange = async (CoC, sampleID, changedResult, testType)=>{
        console.log(CoC);
        console.log(sampleID);
        console.log(changedResult);
        try{
            const response = await fetch(`/api/records/${CoC}`);
            
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const sample = data.samples.find(sample => sample.sampleID == editSampleID);

            if(!sample){
                throw new Error(`Couldn't find sample with ID: ${editSampleID}`);
            }

            console.log(sample);

            const test = sample.tests.find(test => test.name == testType);

            if(!test){
                throw new Error(`Couldn't find test with Name: ${testType}`);
            }

            console.log(test);

            const type = test.tssResults;

            if(!type){
                throw new Error(`Couldn't find test `);
            }

            console.log(type);

            console.log(resultId);

            switch(testType){
                case "TSS":
                    setResultType("tssResults");
                    break;
                case "PH/Conductivity":
                    setResultType("phConResults");
                    break;
                case "TICTOC":
                    setResultType("tictocResults");
                    break;
                case "Alkalinity":
                    setResultType("alkalinityResults");
                case "IC":
                    setResultType("icResults");
            }

            updateCoCTestResult(CoC, sampleID, testType, resultType, resultId, changedResult);
            
        }
        catch(error){
            console.log(`Failure: ${error}`);
        }
    }

    return(
        <div className="test-container">
            <div className="test-pop px-4">
                <header className="title">
                    <h1>Confirm Edit</h1>
                </header>
            </div>
            <div className="flex flex-col justify-center items-center test-pop mt-20 pt-5">
                <div>
                    Chain of Custody: {editCoC}
                </div>
                <div>
                    Sample ID: {editSampleID}
                </div>
                <div>
                    Previous Result: {previousResult}
                </div>
                <div>
                    New Result: {changedResult}
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="submit-button" onClick={() => handleEditChange(editCoC, editSampleID, changedResult, testType)}>Submit</button>
                </div>
            </div>
        </div>
    )
}