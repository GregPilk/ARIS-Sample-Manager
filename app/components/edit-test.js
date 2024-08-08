// "use client";

// import { useState, useEffect } from "react";
// import { COCSelect, SampleIDSelect, TestTypeSelect } from "./find-options";
// import { getRecord, getAllRecords } from "../_services/dbFunctions";
// import AdminPage from "../pages/admin";
// import { updateTestResult } from "../_services/dbFunctions";

// export default function EditTest({requestData}){
//     const[editCoC, setEditCoC] = useState(requestData.chainOfCustody);
//     const[editSampleID, setSampleID] = useState(requestData.sampleID + 1);
//     const[changedResult, setChanged] = useState(requestData.changedResult);
//     const[testType, setType] = useState(requestData.testType);

//     return(
//         <div>
//             <div className="admin-table-pop p-4">
//                 <div className="flex border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 justify-center paper w-7/12 rounded-md">
//                     <h2 className="text-3xl">Confirm Change</h2>
//                 </div>
//                 <div className="flex">
//                     <div className="w-1/3">
//                         Chain of Custody:
//                     </div>
//                     <div className="w-1/3">
//                         {editCoC}
//                     </div>
//                 </div>
//                 <div className="flex">
//                     <div className="w-1/3">
//                         Sample ID:
//                     </div>
//                     <div className="w-1/3">
//                         {editSampleID}
//                     </div>
//                 </div>
//                 <div className="flex">
//                     <div className="w-1/3">
//                         Test:
//                     </div>
//                     <div className="w-1/3">
//                         {testType}
//                     </div>
//                 </div>
//                 <div className="flex">
//                     <div className="w-1/3">
//                         Previous Result:
//                     </div>
//                     <div className="w-1/3">
//                         {Object.keys(requestData.previousResults).map((key) => (
//                             <div>
//                                 {key}: {requestData.previousResults[key]}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="flex">
//                     <div className="w-1/3">
//                         New Result:
//                     </div>
//                     <div className="w-1/3">
//                         {Object.keys(requestData.newResults).map((key) => (
//                             <div>
//                                 {key}: {requestData.newResults[key]}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }
