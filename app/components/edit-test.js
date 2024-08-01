"use client";

import { useState, useEffect } from "react";
import { COCSelect, SampleIDSelect, TestTypeSelect } from "./find-options";
import { getRecord, getAllRecords } from "../_services/dbFunctions";
import AdminPage from "../pages/admin";
import { updateTestResult } from "../_services/dbFunctions";

export default function EditTest({requestData}){
    const {newObj} = requestData.newResults;
    const {prevResults} = requestData.previousResults;
    const[editCoC, setEditCoC] = useState(requestData.chainOfCustody);
    const[editSampleID, setSampleID] = useState(requestData.sampleID + 1);
    const[changedResult, setChanged] = useState(requestData.changedResult);
    const[testType, setType] = useState(requestData.testType);
    const[resultId, setResultID] = useState(requestData.results.resultID);
    const[resultType, setResultType] = useState("");
    const[newData, setNew] = useState({newObj});
    const[prevData, setPrev] = useState({});

    // useEffect(() =>{
    //     console.log("Use Effect");
    //     switch(testType){
    //         case "TSS":
    //             setResultType("TSSResult");
    //             break;
    //         case "PH/Conductivity":
    //             setResultType("PhConResult");
    //             break;
    //         case "TICTOC":
    //             setResultType("TICTOCResult");
    //             break;
    //         case "Alkalinity":
    //             setResultType("AlkalinityResult");
    //         case "IC":
    //             setResultType("ICResult");
    //     }
    // })

    // const handleEditChange =()=>{
    //     try{
    //         updateTestResult(resultId, resultType, requestData.newResults);

    //         console.log("Result Edited");

    //         window.location.reload();

    //     }
    //     catch(error){
    //         console.log(`Failure: ${error}`);
    //     }
    // }

    return(
        <div>
            <div className="admin-table-pop p-4">
                <div className="flex border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 justify-center paper w-7/12 rounded-md">
                    <h2 className="text-3xl">Confirm Change</h2>
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        Chain of Custody:
                    </div>
                    <div className="w-1/3">
                        {editCoC}
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        Sample ID:
                    </div>
                    <div className="w-1/3">
                        {editSampleID}
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        Test:
                    </div>
                    <div className="w-1/3">
                        {testType}
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        Previous Result:
                    </div>
                    <div className="w-1/3">
                        {Object.keys(requestData.previousResults).map((key) => (
                            <div>
                                {key}: {requestData.previousResults[key]}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/3">
                        New Result:
                    </div>
                    <div className="w-1/3">
                        {changedResult}
                    </div>
                </div>

            </div>
        </div>
    )
}