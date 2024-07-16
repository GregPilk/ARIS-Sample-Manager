"use client";
import { useState } from "react";
import { COCSelect } from "@/app/components/find-options";

// Created By: Greg
// Date: 2024-07-15
// Component to display in tables

const DataSection = ({ title, fields }) => (
  <div className="flex flex-col px-6 m-2 w-full">
    <p className="font-bold text-center bg-slate-500 paper py-2 mb-1 rounded-t-md">
      {title}
    </p>
    <table className="table-auto w-full border-collapse rounded-b-md overflow-hidden">
      <tbody>
        {fields.map(({ label, value }) => (
          <tr key={label} className="border-b-2 border-slate-400">
            <td className="bg-slate-200 paper font-bold px-4 rounded-l-md">
              {label}:
            </td>
            <td className="bg-slate-300 paper p-3 text-right rounded-r-md">
              {value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Created By: Nick
// Date: 2024-04-30
// Edited By: Greg
// Date: 2024-07-11
// The component will be used for finding a Chain of Custody in the database
// The component will display the Chain of Custody data

export default function FindSample({ page, getRecord, getAllRecords }) {
  //an empty array that will be filled with the data from the database
  const [data, setData] = useState(null);

  // create a small form with one input field and a submit button
  return (
    <div className="page-container">
      <div className="page-pop px-80">
        <div className="flex justify-center">
          <h1 className="title">{page}</h1>
        </div>
        <div className="text-black flex items-center justify-center flex-col text-xl">
          <div className="subnav-bar paper m-7 justify-center">
            <div className="input-fields">
              <COCSelect
                getRecord={getRecord}
                getAllRecords={getAllRecords}
                setRecord={setData}
              />
            </div>
          </div>
          <div className="flex justify-center">
            {data ? (
              <div className="bg-slate-300 w-max output-box justify-center p-4">
                <div className="flex justify-center">
                  <p className="font-extrabold py-2 text-4xl">
                    {data.chainOfCustody}
                  </p>
                </div>
                <div className="flex flex-row p-2 m-2">
                  <DataSection
                    title="Report To"
                    fields={[
                      { label: "Company", value: data.reportToCompany },
                      { label: "Contact", value: data.reportToContact },
                      { label: "Phone", value: data.reportToPhone },
                      { label: "Street", value: data.reportToStreet },
                      { label: "City", value: data.reportToCity },
                      { label: "Postal", value: data.reportToPostal },
                    ]}
                  />
                  <DataSection
                    title="Invoice To"
                    fields={[
                      {
                        label: "Same As Report",
                        value: data.invoiceToSameAsReport,
                      },
                      {
                        label: "Copy Of Invoice",
                        value: data.invoiceToCopyOfInvoice,
                      },
                      { label: "Company", value: data.invoiceToCompany },
                      { label: "Contact", value: data.invoiceToContact },
                    ]}
                  />
                  <DataSection
                    title="Report / Recipients"
                    fields={[
                      { label: "Format", value: data.reportRecipientFormat },
                      { label: "Merge QC Reports", value: data.mergeQCReports },
                      {
                        label: "Distribution",
                        value: data.selectDistribution,
                      },
                      {
                        label: "Email One",
                        value: data.reportRecipientEmailOne,
                      },
                      {
                        label: "Email Two",
                        value: data.reportRecipientEmailTwo,
                      },
                      {
                        label: "Email Three",
                        value: data.reportRecipientEmailThree,
                      },
                    ]}
                  />
                  <DataSection
                    title="Invoice Recipients"
                    fields={[
                      {
                        label: "Distribution",
                        value: data.invoiceRecipientDistribution,
                      },
                      {
                        label: "Email One",
                        value: data.invoiceRecipientEmailOne,
                      },
                      {
                        label: "Email Two",
                        value: data.invoiceRecipientEmailTwo,
                      },
                    ]}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center">
                <div className="flex justify-center">
                  <p className="hidden">No Data</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
