"use client";

import React from "react";
import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";

export default function ChangeRequest({ requests, onAccept, onReject }) {
  return (
    <div className="mt-6 w-full">
      <div className="test-pop p-4">
        <div className="flex border-2 shadow-md border-white bg-slate-400 font-bold mb-2 p-2 justify-start paper w-7/12 rounded-md">
          <h2 className="text-3xl">Current Change Requests</h2>
        </div>
        <table className="table-auto w-full border-collapse rounded-md overflow-hidden shadow-lg">
          <thead className="font-bold text-center bg-slate-600 paper py-2 rounded-t-md">
            <tr className="border-r border-b border-white">
              <th className="border-r border-l border-white">ID</th>
              <th className="border-r border-white">Chain of Custody</th>
              <th className="border-r border-white">Sample ID</th>
              <th className="border-r border-white">Previous Result</th>
              <th className="border-r border-white">Changed Result</th>
              <th className="border-r border-white">Actions</th>
            </tr>
          </thead>
          <tbody className="border-r border-b border-white">
            {requests.map((request) => (
              <tr
                key={request.id}
                className={`text-center paper rounded-md ${
                  request.id % 2 === 0 ? "bg-slate-400" : "bg-slate-500"
                }`}
              >
                <td className="border-r border-b border-l border-white">
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
                <td className="flex justify-around items-center py-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 general-button px-1 rounded-md"
                    onClick={() => onAccept(request.id)}
                  >
                    <MdCheckCircle className="text-2xl" />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600  general-button  px-1 rounded-md"
                    onClick={() => onReject(request.id)}
                  >
                    <MdCancel className="text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
