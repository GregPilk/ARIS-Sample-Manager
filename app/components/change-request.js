"use client";

import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";

export default function ChangeRequest({ requests, onAccept, onReject }) {
  return (
    <div className="w-full">
      <div className="admin-table-pop p-4">
        <div className="flex border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 justify-center paper w-7/12 rounded-md">
          <h2 className="text-3xl">Current Change Requests</h2>
        </div>
        <table className="table-auto w-full border-collapse rounded-md overflow-hidden shadow-lg">
          <thead className="font-bold text-center border-t-2 border-r-2 border-l-2 border-white bg-slate-600 paper py-2 rounded-t-md">
            <tr className="border-r border-b border-white">
              <th className="border-r border-l border-white">ID</th>
              <th className="border-r border-white">Chain of Custody</th>
              <th className="border-r border-white">Sample ID</th>
              <th className="border-r border-white">Previous Result</th>
              <th className="border-r border-white">Changed Result</th>
              <th className="border-r border-white">Actions</th>
            </tr>
          </thead>
          <tbody className="border-r border-b-2 border-white">
            {requests.map((request) => (
              <tr
                key={request.id}
                className={`text-center paper rounded-md ${
                  request.id % 2 === 0 ? "bg-slate-400" : "bg-slate-500"
                }`}
              >
                <td className="border-r border-b border-l-2 border-white">
                  {request.id}
                </td>
                <td className="border-r border-b border-white">
                  {request.chainOfCustody}
                </td>
                <td className="border-r border-b border-white">
                  {request.sampleID}
                </td>
                <td className="border-r border-b border-white">
                  {request.previousResult}
                </td>
                <td className="border-r border-b border-white">
                  {request.changedResult}
                </td>
                <td className="border-b border-r-2 border-white">
                  <div className="flex justify-around py-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 general-button px-1 rounded-md"
                    onClick={() => onAccept(request)}
                  >
                    <MdCheckCircle className="text-2xl" />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600  general-button  px-1 rounded-md"
                    onClick={() => onReject(request.id)}
                  >
                    <MdCancel className="text-2xl" />
                  </button>
                </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
