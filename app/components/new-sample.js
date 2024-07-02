"use client";
import { useState, useEffect } from "react";
// import { useUserAuth } from "../../../_utils/auth-context";
import Link from "next/link";
import { insertData } from "_services/dbFunctions";
import Navbar from "components/navbar";
import { useRouter } from "next/navigation";

export default function Page() {
  //   const { user, emailPasswordSignIn, firebaseSignOut } = useUserAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  //Report To variables
  const [reportToCompany, setReportToCompany] = useState("");
  const [reportToContact, setReportToContact] = useState("");
  const [reportToPhone, setReportToPhone] = useState("");
  const [reportToStreet, setReportToStreet] = useState("");
  const [reportToCity, setReportToCity] = useState("");
  const [reportToPostal, setReportToPostal] = useState("");

  //Invoice To variables
  const [invoiceToSameAsReport, setInvoiceToSameAsReport] = useState("");
  const [invoiceToCopyOfInvoice, setInvoiceToCopyOfInvoice] = useState("");
  const [invoiceToCompany, setInvoiceToCompany] = useState("");
  const [invoiceToContact, setInvoiceToContact] = useState("");

  //Report / Recipients variables
  const [reportRecipientFormat, setReportRecipientFormat] = useState("");
  const [mergeQCReports, setMergeQCReports] = useState("");
  const [selectDistribution, setSelectDistribution] = useState("");
  const [reportRecipientEmailOne, setReportRecipientEmailOne] = useState("");
  const [reportRecipientEmailTwo, setReportRecipientEmailTwo] = useState("");
  const [reportRecipientEmailThree, setReportRecipientEmailThree] =
    useState("");

  //Invoice Recipients variables
  const [invoiceRecipientDistribution, setInvoiceRecipientDistribution] =
    useState("");
  const [invoiceRecipientEmailOne, setInvoiceRecipientEmailOne] = useState("");
  const [invoiceRecipientEmailTwo, setInvoiceRecipientEmailTwo] = useState("");

  //Chain of Custody variables
  const [chainOfCustody, setChainOfCustody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      reportToCompany,
      reportToContact,
      reportToPhone,
      reportToStreet,
      reportToCity,
      reportToPostal,
      invoiceToSameAsReport,
      invoiceToCopyOfInvoice,
      invoiceToCompany,
      invoiceToContact,
      reportRecipientFormat,
      mergeQCReports,
      selectDistribution,
      reportRecipientEmailOne,
      reportRecipientEmailTwo,
      reportRecipientEmailThree,
      invoiceRecipientDistribution,
      invoiceRecipientEmailOne,
      invoiceRecipientEmailTwo,
      chainOfCustody,
    };

    insertData(data, chainOfCustody);
  };

  useEffect(() => {
    // Check every 5 seconds if user is logged in
    const interval = setInterval(() => {
      if (!user) {
        router.push("/");
      }
    }, 500); // Adjust interval as needed

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    // Set initial login status
    setIsLoggedIn(!!user);
  }, [user]);

  if (!isLoggedIn) {
    return (
      <div classname="mt-16">
        <p>redirecting...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="page-flat">
          {user ? (
            <div>
              <div className="flex justify-center">
                <h1 className="title">New Chain of Custody Record</h1>
              </div>

              {/*Form Begins*/}
              <form onSubmit={handleSubmit} className="text-black">
                {/*Div for Report To and Invoice To*/}
                <div className="flex flex-row">
                  {/* Report To*/}
                  <div className="bg-slate-300 flex flex-col m-7 p-2 w-full justify-center rounded-lg shadow-2xl border-2 border-black">
                    <div>
                      <div className="flex text-black justify-center align-middle p-2 font-semibold text-lg">
                        <h2>Report To</h2>
                      </div>
                    </div>
                    <div className="green-good">g</div>

                    {/* div to separate title and form components */}
                    <div className="flex flex-row justify-center">
                      {/* div to set flex to row */}
                      <div className="flex flex-row">
                        {/*Contact and company name below will appear on final report*/}
                        <div className="flex flex-col p-2">
                          <div className="flex justify-end p-2">
                            <label
                              className="text-black font-semibold"
                              htmlFor="reportToCompany"
                            >
                              Company:
                            </label>
                            <input
                              className="border border-black p-1"
                              type="text"
                              id="reportToCompany"
                              name="reportToCompany"
                              value={reportToCompany}
                              onChange={(e) =>
                                setReportToCompany(e.target.value)
                              }
                            />
                          </div>
                          <div className="flex justify-end p-2">
                            <label
                              className="text-black font-semibold"
                              htmlFor="reportToContact"
                            >
                              Contact:
                            </label>
                            <input
                              className="border border-black p-1"
                              type="text"
                              id="reportToContact"
                              name="reportToContact"
                              value={reportToContact}
                              onChange={(e) =>
                                setReportToContact(e.target.value)
                              }
                            />
                          </div>
                          <div className="flex justify-end p-2">
                            <label
                              className="text-black font-semibold"
                              htmlFor="reportToPhone"
                            >
                              Phone:
                            </label>
                            <input
                              className="border border-black p-1"
                              type="text"
                              id="reportToPhone"
                              name="reportToPhone"
                              value={reportToPhone}
                              onChange={(e) => setReportToPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        {/*Company address below will appear on final report*/}
                        <div className="flex flex-col p-2">
                          <div className="flex justify-end p-2">
                            <label
                              className="text-black font-semibold"
                              htmlFor="reportToStreet"
                            >
                              Street:
                            </label>
                            <input
                              className="border border-black p-1"
                              type="text"
                              id="reportToStreet"
                              name="reportToStreet"
                              value={reportToStreet}
                              onChange={(e) =>
                                setReportToStreet(e.target.value)
                              }
                            />
                          </div>
                          <div className="flex justify-end p-2 ">
                            <label
                              className="text-black font-semibold w-max"
                              htmlFor="reportToCity"
                            >
                              City/ Province:
                            </label>
                            <input
                              className="border border-black p-1"
                              type="text"
                              id="reportToCity"
                              name="reportToCity"
                              value={reportToCity}
                              onChange={(e) => setReportToCity(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end p-2">
                            <label
                              className="text-black font-semibold"
                              htmlFor="reportToPostal"
                            >
                              Postal Code:
                            </label>
                            <input
                              className="border border-black p-1"
                              type="text"
                              id="reportToPostal"
                              name="reportToPostal"
                              value={reportToPostal}
                              onChange={(e) =>
                                setReportToPostal(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invoice To*/}
                  <div className="bg-slate-300 flex flex-col m-7 p-2 w-full rounded-lg shadow-2xl border-2 border-black ">
                    <div>
                      <div className="flex text-black justify-center  p-2 font-semibold text-lg">
                        <h2>Invoice To</h2>
                      </div>
                    </div>

                    {/* div to separate title and form components */}
                    <div className="flex flex-col justify-center">
                      {/*div to separate radio buttons (Same as Report To/ Copy of Invoice with Report) and text inputs for Company and*/}
                      <div className="flex flex-row justify-center">
                        {/*Same as Report To:*/}
                        <div className="m-2">
                          <label
                            className="text-black font-semibold"
                            htmlFor="option"
                          >
                            Same as Report To:
                          </label>
                          <div>
                            <input
                              className="border border-black p-1"
                              type="radio"
                              id="invoiceToSameAsReportYes"
                              name="option1"
                              value="yes"
                              onChange={(e) =>
                                setInvoiceToSameAsReport(e.target.value)
                              }
                            />
                            <label
                              htmlFor="invoiceToSameAsReportYes"
                              className="text-black"
                            >
                              Yes
                            </label>
                          </div>
                          <div>
                            <input
                              className="border border-black p-1"
                              type="radio"
                              id="invoiceToSameAsReportNo"
                              name="option1"
                              value="no"
                              onChange={(e) =>
                                setInvoiceToSameAsReport(e.target.value)
                              }
                            />
                            <label
                              htmlFor="invoiceToSameAsReportNo"
                              className="text-black"
                            >
                              No
                            </label>
                          </div>
                        </div>

                        {/*Copy of Invoice with Report*/}
                        <div className="m-2">
                          <label
                            className="text-black font-semibold"
                            htmlFor="option"
                          >
                            Copy of Invoice with Report:
                          </label>
                          <div>
                            <input
                              className="border border-black p-1"
                              type="radio"
                              id="invoiceToCopyOfInvoiceYes"
                              name="option2"
                              value="yes"
                              onChange={(e) =>
                                setInvoiceToCopyOfInvoice(e.target.value)
                              }
                            />
                            <label
                              htmlFor="invoiceToCopyOfInvoiceYes"
                              className="text-black"
                            >
                              Yes
                            </label>
                          </div>
                          <div>
                            <input
                              className="border border-black p-1"
                              type="radio"
                              id="invoiceToCopyOfInvoiceNo"
                              name="option2"
                              value="no"
                              onChange={(e) =>
                                setInvoiceToCopyOfInvoice(e.target.value)
                              }
                            />
                            <label
                              htmlFor="invoiceToCopyOfInvoiceNo"
                              className="text-black"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      {/*Company and Contact*/}
                      <div className="flex justify-center">
                        <div className="flex flex-col p-2 w-min">
                          <div className="flex justify-end mr-12">
                            <label
                              className="text-black font-semibold"
                              htmlFor="invoiceToCompany"
                            >
                              Company:
                            </label>
                            <input
                              className="border border-black p-1 m-1"
                              type="text"
                              id="invoiceToCompany"
                              name="invoiceToCompany"
                              value={invoiceToCompany}
                              onChange={(e) =>
                                setInvoiceToCompany(e.target.value)
                              }
                            />
                          </div>
                          <div className="flex justify-end mr-12">
                            <label
                              className="text-black font-semibold"
                              htmlFor="company"
                            >
                              Contact:
                            </label>
                            <input
                              className="border border-black p-1 m-1"
                              type="text"
                              id="company"
                              name="company"
                              value={invoiceToContact}
                              onChange={(e) =>
                                setInvoiceToContact(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Report / Recipients*/}
                <div className="bg-slate-300 flex flex-col m-7 p-2 rounded-lg shadow-2xl border-2 border-black">
                  <div>
                    <div className="flex text-black justify-center align-middle p-2 font-semibold text-lg">
                      <h2>Report / Recipients</h2>
                    </div>
                  </div>

                  {/* div to separate title and form components */}
                  <div className="flex w-full">
                    {/* div to set flex to row */}
                    <div className="flex flex-row justify-around w-full p-2">
                      {/*Select Report Format*/}
                      <div className="m-2">
                        <label
                          className="text-black font-semibold"
                          htmlFor="option"
                        >
                          Select Report Format:
                        </label>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="reportRecipientFormatPDF"
                            name="option3"
                            value="PDF"
                            onChange={(e) =>
                              setReportRecipientFormat(e.target.value)
                            }
                          />
                          <label
                            htmlFor="reportRecipientFormatPDF"
                            className="text-black"
                          >
                            PDF
                          </label>
                        </div>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="reportRecipientFormatEXCEL"
                            name="option3"
                            value="EXCEL"
                            onChange={(e) =>
                              setReportRecipientFormat(e.target.value)
                            }
                          />
                          <label
                            htmlFor="reportRecipientFormatEXCEL"
                            className="text-black"
                          >
                            EXCEL
                          </label>
                        </div>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="reportRecipientFormatEDD"
                            name="option3"
                            value="EDD"
                            onChange={(e) =>
                              setReportRecipientFormat(e.target.value)
                            }
                          />
                          <label
                            htmlFor="reportRecipientFormatEDD"
                            className="text-black"
                          >
                            EDD (Digital)
                          </label>
                        </div>
                      </div>

                      {/*MERGE QC/QCI Reports with COA*/}
                      <div className="m-2">
                        <label
                          className="text-black font-semibold"
                          htmlFor="option"
                        >
                          Merge QC/QCI Reports with COA
                        </label>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="mergeQCReportsYes"
                            name="option4"
                            value="yes"
                            onChange={(e) => setMergeQCReports(e.target.value)}
                          />
                          <label
                            htmlFor="mergeQCReportsYes"
                            className="text-black"
                          >
                            Yes
                          </label>
                        </div>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="mergeQCReportsNo"
                            name="option4"
                            value="no"
                            onChange={(e) => setMergeQCReports(e.target.value)}
                          />
                          <label
                            htmlFor="mergeQCReportsNo"
                            className="text-black"
                          >
                            No
                          </label>
                        </div>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="mergeQCReportsNA"
                            name="option4"
                            value="N/A"
                            onChange={(e) => setMergeQCReports(e.target.value)}
                          />
                          <label
                            htmlFor="mergeQCReportsNA"
                            className="text-black"
                          >
                            N/A
                          </label>
                        </div>
                      </div>

                      {/*Select Distribution*/}
                      <div className="m-2">
                        <label
                          className="text-black font-semibold"
                          htmlFor="option"
                        >
                          Select Distribution:
                        </label>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="selectDistributionEmail"
                            name="option5"
                            value="email"
                            onChange={(e) =>
                              setSelectDistribution(e.target.value)
                            }
                          />
                          <label
                            htmlFor="selectDistributionEmail"
                            className="text-black"
                          >
                            Email
                          </label>
                        </div>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="selectDistributionMail"
                            name="option5"
                            value="mail"
                            onChange={(e) =>
                              setSelectDistribution(e.target.value)
                            }
                          />
                          <label
                            htmlFor="selectDistributionMail"
                            className="text-black"
                          >
                            Mail
                          </label>
                        </div>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="selectDistributionFax"
                            name="option5"
                            value="fax"
                            onChange={(e) =>
                              setSelectDistribution(e.target.value)
                            }
                          />
                          <label
                            htmlFor="selectDistributionFax"
                            className="text-black"
                          >
                            Fax
                          </label>
                        </div>
                      </div>

                      {/*Email contacts*/}
                      <div className="p-4">
                        <div className="flex justify-end">
                          <label
                            className="text-black font-semibold"
                            htmlFor="reportRecipientEmailOne"
                          >
                            Email or Fax 1:
                          </label>
                          <input
                            className="border border-black p-1 m-1"
                            type="email"
                            id="reportRecipientEmailOne"
                            name="reportRecipientEmailOne"
                            value={reportRecipientEmailOne}
                            onChange={(e) =>
                              setReportRecipientEmailOne(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex justify-end">
                          <label
                            className="text-black font-semibold"
                            htmlFor="reportRecipientEmailTwo"
                          >
                            Email 2:
                          </label>
                          <input
                            className="border border-black p-1 m-1"
                            type="email"
                            id="reportRecipientEmailTwo"
                            name="reportRecipientEmailTwo"
                            value={reportRecipientEmailTwo}
                            onChange={(e) =>
                              setReportRecipientEmailTwo(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex justify-end">
                          <label
                            className="text-black font-semibold"
                            htmlFor="reportRecipientEmailThree"
                          >
                            Email 3:
                          </label>
                          <input
                            className="border border-black p-1 m-1"
                            type="email"
                            id="reportRecipientEmailThree"
                            name="reportRecipientEmailThree"
                            value={reportRecipientEmailThree}
                            onChange={(e) =>
                              setReportRecipientEmailThree(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*Div to separate Invoice Recipients and Chain of Custody*/}
                <div className="flex flex-row">
                  {/*Invoice Recipients*/}
                  <div className="bg-slate-300 flex flex-col justify-center m-7 p-2 w-full rounded-lg shadow-2xl border-2 border-black">
                    <div>
                      <div className="flex text-black justify-center align-middle p-2 font-semibold text-lg">
                        <h2>Invoice Recipients</h2>
                      </div>
                    </div>

                    {/* div to separate title and form components */}
                    <div className="flex flex-row justify-center">
                      {/*Select Invoice Distribution*/}
                      <div className="m-2 w-max">
                        <label
                          className="text-black font-semibold"
                          htmlFor="option"
                        >
                          Select Invoice Distribution:
                        </label>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="invoiceRecipientDistributionEmail"
                            name="option6"
                            value="email"
                            onChange={(e) =>
                              setInvoiceRecipientDistribution(e.target.value)
                            }
                          />
                          <label
                            htmlFor="invoiceRecipientDistributionEmail"
                            className="text-black"
                          >
                            Email
                          </label>
                        </div>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="invoiceRecipientDistributionMail"
                            name="option6"
                            value="mail"
                            onChange={(e) =>
                              setInvoiceRecipientDistribution(e.target.value)
                            }
                          />
                          <label
                            htmlFor="invoiceRecipientDistributionMail"
                            className="text-black"
                          >
                            Mail
                          </label>
                        </div>
                        <div>
                          <input
                            className="border border-black p-1"
                            type="radio"
                            id="invoiceRecipientDistributionFax"
                            name="option6"
                            value="fax"
                            onChange={(e) =>
                              setInvoiceRecipientDistribution(e.target.value)
                            }
                          />
                          <label
                            htmlFor="invoiceRecipientDistributionFax"
                            className="text-black"
                          >
                            Fax
                          </label>
                        </div>
                      </div>

                      {/*Email contacts*/}
                      <div className="p-4 w-max">
                        <div className="flex justify-end">
                          <label
                            className="text-black font-semibold"
                            htmlFor="InvoiceRecipientEmailOne"
                          >
                            Email or Fax 1:
                          </label>
                          <input
                            className="border border-black p-1 m-1"
                            type="email"
                            id="InvoiceRecipientEmailOne"
                            name="InvoiceRecipientEmailOne"
                            value={invoiceRecipientEmailOne}
                            onChange={(e) =>
                              setInvoiceRecipientEmailOne(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex justify-end">
                          <label
                            className="text-black font-semibold"
                            htmlFor="InvoiceRecipientEmailTwo"
                          >
                            Email 2:
                          </label>
                          <input
                            className="border border-black p-1 m-1"
                            type="text"
                            id="InvoiceRecipientEmailTwo"
                            name="InvoiceRecipientEmailTwo"
                            value={invoiceRecipientEmailTwo}
                            onChange={(e) =>
                              setInvoiceRecipientEmailTwo(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*Chain of Custody*/}
                  <div className="bg-slate-300 flex flex-col m-7 p-2 w-full rounded-lg shadow-2xl border-2 border-black">
                    <div>
                      <div className="flex text-black justify-center p-2 font-semibold text-lg">
                        <h2>Chain of Custody Number (COC)</h2>
                      </div>
                    </div>

                    {/* div to separate title and form components */}
                    <div className="flex flex-col justify-center p-2">
                      <div className="flex justify-center p-2">
                        <input
                          className="border border-black p-1 m-1"
                          type="text"
                          id="chainOfCustody"
                          name="chainOfCustody"
                          value={chainOfCustody}
                          onChange={(e) => setChainOfCustody(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*Submit Button*/}
                <div className="flex justify-center">
                  <button
                    className="bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
              {/*Form Ends*/}
              {/*link back to screens*/}
              <div className="flex justify-center p-3">
                <Link
                  href="/pages/dashboard"
                  className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  Back to Screens
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p>
                <Link href="/sampletracking">Login</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
