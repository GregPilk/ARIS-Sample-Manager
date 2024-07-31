"use client";

import { useState, useEffect } from "react";
import { COCSelect, SampleIDSelect, TestTypeSelect } from "./find-options";
import { getRecord, getAllRecords } from "../_services/dbFunctions";
import AdminPage from "../pages/admin";
import { updateTestResult } from "../_services/dbFunctions";

export default function EditTest({requestData}){
    const {newObj} = requestData.newResults;
    const[editCoC, setEditCoC] = useState(requestData.chainOfCustody);
    const[editSampleID, setSampleID] = useState(requestData.sampleID + 1);
    const[previousResult, setEditTest] = useState(requestData.previousResult);
    const[changedResult, setChanged] = useState(requestData.changedResult);
    const[testType, setType] = useState(requestData.testType);
    const[resultId, setResultID] = useState(requestData.results.resultID);
    const[resultType, setResultType] = useState("");
    const[newData, setNew] = useState({newObj});

    useEffect(() =>{
        console.log("Use Effect");
        switch(testType){
            case "TSS":
                setResultType("TSSResult");
                break;
            case "PH/Conductivity":
                setResultType("PhConResult");
                break;
            case "TICTOC":
                setResultType("TICTOCResult");
                break;
            case "Alkalinity":
                setResultType("AlkalinityResult");
            case "IC":
                setResultType("ICResult");
        }
    })

    const handleEditChange =()=>{
        try{
            updateTestResult(resultId, resultType, requestData.newResults);

            console.log("Result Edited");

            window.location.reload();

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
                    <button type="submit" className="submit-button" onClick={() => handleEditChange()}>Submit</button>
                </div>
            </div>
        </div>
    )
}