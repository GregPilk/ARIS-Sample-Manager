"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function FindSample({ page }) {
  //an empty array that will be filled with the data from the database
  const [data, setData] = useState(null);

  //variable to hold the id of the Chain of Custody
  const [id, setId] = useState("");

  //handle submit searches for the data in database using the Chain of custody as the ID
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getData(id);
    setData(data);
    console.log(data);
  };

  // create a small form with one input field and a submit button
  return (
    <div className="page-container">
      <div className="page-pop px-80">
        <div className="flex justify-center">
          <h1 className="title">{page}</h1>
        </div>
        <div className="text-black flex justify-center flex-col text-xl mt-16">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center flex-col"
          >
            <div className="flex justify-center">
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter Chain of Custody ID"
                className=" flex border-2 border-gray-500 p-2 m-2 w-1/2"
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="submit-button">
                Find Sample
              </button>
            </div>
          </form>
          <p>Please sign in to access this feature.</p>
          <div className="flex justify-center">
            {data ? (
              <div className="bg-slate-300 w-max flex flex-col justify-center p-4">
                <div className="flex justify-center">
                  <p className=" font-extrabold text-2xl">
                    Chain of Custody ID: {data.chainOfCustody}
                  </p>
                </div>
                <div className="flex flex-row p-2 m-2">
                  <div className="flex flex-col px-6 m-2">
                    <p className=" font-bold">Report To</p>
                    <p>Company: {data.reportToCompany}</p>
                    <p>Contact: {data.reportToContact}</p>
                    <p>Phone: {data.reportToPhone}</p>
                    <p>Street: {data.reportToStreet}</p>
                    <p>City: {data.reportToCity}</p>
                    <p>Postal: {data.reportToPostal}</p>
                  </div>
                  <div className="flex flex-col px-6 m-2">
                    <p className=" font-bold">Invoice To</p>
                    <p>Same As Report: {data.invoiceToSameAsReport}</p>
                    <p>Copy Of Invoice: {data.invoiceToCopyOfInvoice}</p>
                    <p>Company: {data.invoiceToCompany}</p>
                    <p>Contact: {data.invoiceToContact}</p>
                  </div>
                  <div className="flex flex-col px-6 m-2">
                    <p className=" font-bold">Report / Recipients</p>
                    <p>Format: {data.reportRecipientFormat}</p>
                    <p>Merge QC Reports: {data.mergeQCReports}</p>
                    <p>Selected Distribution: {data.selectDistribution}</p>
                    <p>Email One: {data.reportRecipientEmailOne}</p>
                    <p>Email Two: {data.reportRecipientEmailTwo}</p>
                    <p>Email Three: {data.reportRecipientEmailThree}</p>
                  </div>
                  <div className="flex flex-col px-6 m-2">
                    <p className=" font-bold">Invoice Recipients</p>
                    <p>
                      Recipient Distribution:{" "}
                      {data.invoiceRecipientDistribution}
                    </p>
                    <p>Recipient Email One: {data.invoiceRecipientEmailOne}</p>
                    <p>Recipient Email Two: {data.invoiceRecipientEmailTwo}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <div className="flex justify-center">
                  <p>No data found</p>
                </div>
                {/* <Link
                    href="/pages/dashboard"
                    className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded m-6 w-max"
                  >
                    Back to Screens
                  </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
