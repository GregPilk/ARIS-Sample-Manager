import React, { useState, useEffect } from "react";
import formData from "../objects/newSample.json";
import { createRecord } from "../_services/dbFunctions";

const NewSampleForm = () => {
  const [formValues, setFormValues] = useState({});
  const [selectedTests, setSelectedTests] = useState([]);
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorFields, setErrorFields] = useState({});
  const [showSuccessfulSubmit, setShowSuccessfulSubmit] = useState(false);

  useEffect(() => {
    // Initialize form values here if necessary
  }, []);

  const handleChange = (e, section, key) => {
    const updatedValues = { ...formValues };
    updatedValues[section] = {
      ...updatedValues[section],
      [key]: e.target.value,
    };
    setFormValues(updatedValues);
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedTests((prevSelectedTests) => [...prevSelectedTests, id]);
    } else {
      setSelectedTests((prevSelectedTests) =>
        prevSelectedTests.filter((testId) => testId !== id)
      );
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const isPhoneNumberValid = (phone) => {
      const cleanedPhone = phone.replace(/[\s-]/g, "");
      return (
        /^[\d\s-]{9,15}$/.test(phone) &&
        cleanedPhone.length >= 9 &&
        cleanedPhone.length <= 10
      );
    };
    const isPostalCodeValid = (postalCode) =>
      /^[A-Za-z0-9\s-]{5,10}$/.test(postalCode);

    // Report To Validations
    if (!formValues.reportTo?.reportToCompany) {
      newErrors.reportToCompany = "Report Company is required.";
    }
    if (!formValues.reportTo?.reportToContact) {
      newErrors.reportToContact = "Report Contact is required.";
    }
    if (
      !formValues.reportTo?.reportToPhone ||
      !isPhoneNumberValid(formValues.reportTo.reportToPhone)
    ) {
      newErrors.reportToPhone =
        "Report Phone must be all digits and 10-15 characters.";
    }
    if (!formValues.reportTo?.reportToStreet) {
      newErrors.reportToStreet = "Report Street is required.";
    }
    if (!formValues.reportTo?.reportToCity) {
      newErrors.reportToCity = "Report City is required.";
    }
    if (
      !formValues.reportTo?.reportToPostal ||
      !isPostalCodeValid(formValues.reportTo.reportToPostal)
    ) {
      newErrors.reportToPostal =
        "Report Postal Code is required and must be in a valid format.";
    }

    // Invoice To Validations
    if (!formValues.invoiceTo?.invoiceToCompany) {
      newErrors.invoiceToCompany = "Invoice Company is required.";
    }
    if (!formValues.invoiceTo?.invoiceToContact) {
      newErrors.invoiceToContact = "Invoice Contact is required.";
    }

    // Report Recipients Validations
    if (!formValues.reportRecipients?.reportFormat) {
      newErrors.reportFormat = "Report Format is required.";
    }
    if (!formValues.reportRecipients?.mergeReports) {
      newErrors.mergeReports = "Merge QC/QCI is required.";
    }
    if (!formValues.reportRecipients?.distribution) {
      newErrors.distribution = "Distribution is required.";
    } else {
      // Conditional validation based on distribution type
      if (
        formValues.reportRecipients.distribution === "Email" &&
        !formValues.reportRecipients.reportRecipientEmail
      ) {
        newErrors.reportRecipientEmail = "Report Email is required.";
      }
      if (
        formValues.reportRecipients.distribution === "Fax" &&
        !formValues.reportRecipients.reportRecipientFax
      ) {
        newErrors.reportRecipientFax = "Report Fax is required.";
      }
    }

    // Invoice Recipients Validations
    if (!formValues.invoiceRecipients?.invoiceDistribution) {
      newErrors.invoiceDistribution = "Invoice Distribution is required.";
    } else {
      // Conditional validation based on invoice distribution type
      if (
        formValues.invoiceRecipients.invoiceDistribution === "Email" &&
        !formValues.invoiceRecipients.invoiceRecipientEmail
      ) {
        newErrors.invoiceRecipientEmail = "Invoice Email is required.";
      }
      if (
        formValues.invoiceRecipients.invoiceDistribution === "Fax" &&
        !formValues.invoiceRecipients.invoiceRecipientFax
      ) {
        newErrors.invoiceRecipientFax = "Invoice Fax is required.";
      }
    }

    return newErrors;
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // Set error fields to trigger red border flash
      setErrorFields(validationErrors);

      // Remove error styling after 1 second
      setTimeout(() => {
        setErrorFields({});
      }, 1000);

      setShowErrorModal(true);
      return;
    }

    setErrors({});
    setErrorFields({});

    const newRecord = {
      chainOfCustody: formValues.chainOfCustody.chainOfCustodyCOC,
      reportToCompany: formValues.reportTo.reportToCompany,
      reportToContact: formValues.reportTo.reportToContact,
      reportToPhone: formValues.reportTo.reportToPhone,
      reportToStreet: formValues.reportTo.reportToStreet,
      reportToCity: formValues.reportTo.reportToCity,
      reportToPostal: formValues.reportTo.reportToPostal,
      invoiceToSameAsReport: formValues.invoiceTo.sameAsReportTo,
      invoiceToCopyOfInvoice: formValues.invoiceTo.copyOfInvoiceWithReport,
      invoiceToCompany: formValues.invoiceTo.invoiceToCompany,
      invoiceToContact: formValues.invoiceTo.invoiceToContact,
      reportRecipientFormat: formValues.reportRecipients.reportFormat,
      mergeQCReports: formValues.reportRecipients.mergeReports,
      selectDistribution: formValues.reportRecipients.distribution,
      reportRecipientEmailOne: formValues.reportRecipients.reportRecipientEmail,
      reportRecipientEmailTwo:
        formValues.invoiceRecipients?.invoiceRecipientEmail2,
      reportRecipientEmailThree: "test@email.com",
      invoiceRecipientDistribution:
        formValues.invoiceRecipients.invoiceDistribution,
      invoiceRecipientEmailOne:
        formValues.invoiceRecipients.invoiceRecipientEmail,
      invoiceRecipientEmailTwo:
        formValues.invoiceRecipients.invoiceRecipientEmail2,
      samples: [],
    };

    // Create samples based on sampleAmount value
    const sampleAmount = parseInt(formValues.chainOfCustody?.sampleAmount || 0);
    if (!isNaN(sampleAmount) && sampleAmount > 0) {
      console.log(`\nCreating ${sampleAmount} samples:`);
      for (let i = 1; i <= sampleAmount; i++) {
        const sample = {
          sampleID: "",
          type: "water",
          tests: [],
        };

        const sampleName = `${formValues.chainOfCustody?.sampleName}${i}`;
        sample.sampleID = sampleName;
        console.log(`${sampleName}:`);

        selectedTests.forEach((testId) => {
          const test = tests.find((test) => test.id === testId);

          if (test.name === "PH/Conductivity") {
            const newTest = {
              name: test.name,
              phConResults: [],
            };
            sample.tests.push(newTest);
          }
          if (test.name === "TSS") {
            const newTest = {
              name: test.name,
              tssResults: [],
            };
            sample.tests.push(newTest);
          }
          if (test.name === "IC") {
            const newTest = {
              name: test.name,
              icResults: [],
            };
            sample.tests.push(newTest);
          }
          if (test.name === "Alkalinity") {
            const newTest = {
              name: test.name,
              alkalinityResults: [],
            };
            sample.tests.push(newTest);
          }
          if (test.name === "TICTOC") {
            const newTest = {
              name: test.name,
              tictocResults: [],
            };
            sample.tests.push(newTest);
          }
        });
        newRecord.samples.push(sample);
      }
    } else {
      console.log("Invalid sample amount or not specified.");
    }
    console.log(formValues);
    console.log(newRecord);
    // window.alert("Form submitted successfully!");
    setShowSuccessfulSubmit(true);
    createRecord(newRecord);
    setFormValues({});
  };

  const tests = [
    { id: "PH/Conductivity", name: "PH/Conductivity" },
    { id: "TSS", name: "TSS" },
    { id: "IC", name: "IC" },
    { id: "Alkalinity", name: "Alkalinity" },
    { id: "TICTOC", name: "TICTOC" },
  ];

  const renderInputField = (field, section) => {
    const error = errors[field.name];
    const hasError = Boolean(error);
    const [flashClass, setFlashClass] = useState("");

    useEffect(() => {
      if (hasError) {
        setFlashClass("input-error");
        const timer = setTimeout(() => {
          setFlashClass("");
        }, 1000); // duration of the flash animation

        return () => clearTimeout(timer);
      }
    }, [hasError]);

    useEffect(() => {
      if (showSuccessfulSubmit) {
        const timer = setTimeout(() => {
          setShowSuccessfulSubmit(false);
        }, 2000); // 2500 milliseconds = 2.5 seconds

        return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
      }
    }, [showSuccessfulSubmit]);

    if (field.type === "text" || field.type === "int") {
      return (
        <div className="flex justify-between w-72 m-2" key={field.id}>
          <div className="text-center">
            <label className="font-bold mr-2" htmlFor={field.id}>
              {field.label}
            </label>
          </div>
          <div className="text-right">
            <input
              className={`w-44 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 pl-2 ${flashClass}`}
              type={field.type === "int" ? "number" : field.type}
              id={field.id}
              name={field.name}
              value={formValues[section]?.[field.name] || ""}
              onChange={(e) => handleChange(e, section, field.name)}
            />
          </div>
        </div>
      );
    } else if (field.type === "radio") {
      return (
        <div className="flex justify-between w-80 m-2" key={field.label}>
          <div className="w-40">
            <label className="font-bold mr-2" htmlFor={field.id}>
              {field.label}
            </label>
          </div>
          <div className="flex justify-around flex-grow">
            {field.options.map((option) => (
              <div className="flex flex-col items-center" key={option.id}>
                <input
                  className="mx-6"
                  type="radio"
                  id={option.id}
                  name={option.name}
                  value={option.value}
                  checked={formValues[section]?.[option.name] === option.value}
                  onChange={(e) => handleChange(e, section, option.name)}
                />
                <label htmlFor={option.id} className="font-bold">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  const fillDemoData = () => {
    const demoData = {
      chainOfCustody: {
        chainOfCustodyCOC: "Demo COC",
        sampleAmount: "5",
        sampleName: "Sample",
      },
      reportTo: {
        reportToCompany: "Demo Company",
        reportToContact: "Demo Contact",
        reportToPhone: "1234567890",
        reportToStreet: "123 Demo St",
        reportToCity: "Demo City",
        reportToPostal: "12345",
      },
      invoiceTo: {
        sameAsReportTo: true,
        copyOfInvoiceWithReport: true,
        invoiceToCompany: "Demo Invoice Company",
        invoiceToContact: "Demo Invoice Contact",
      },
      reportRecipients: {
        reportFormat: "PDF",
        mergeReports: "Yes",
        distribution: "Email",
        reportRecipientEmail: "demo@report.com",
      },
      invoiceRecipients: {
        invoiceDistribution: "Email",
        invoiceRecipientEmail: "demo@invoice.com",
      },
    };
    setFormValues(demoData);
    setSelectedTests(["PH/Conductivity", "TSS"]);
  };

  return (
    <div className="page-container">
      <div className="page-pop px-16">
        <div className="flex justify-center">
          <header className="title">
            <h1>New Chain of Custody</h1>
          </header>
          <button type="button" onClick={fillDemoData}>.</button>
        </div>
        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="short-wide-box">
            <h2 className="m-2 text-2xl font-bold"> Chain of Custody</h2>
            <div className="horizontal-fields">
              {Object.values(formData.chainOfCustody).map((field) =>
                renderInputField(field, "chainOfCustody")
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <div className="input-box m-7">
                <h2 className="m-2 text-2xl font-bold">Report</h2>
                <div className="input-fields">
                  {Object.values(formData.reportTo).map((field) =>
                    renderInputField(field, "reportTo")
                  )}
                </div>
              </div>
              <div className="input-box m-7">
                <h2 className="m-2 text-2xl font-bold">Invoice</h2>
                <div className="input-fields">
                  {Object.values(formData.invoiceTo).map((field) =>
                    renderInputField(field, "invoiceTo")
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-start">
                <div className="special-box mr-7">
                  <h2 className="m-2 mt-4 text-2xl font-bold">
                    Report Recipients
                  </h2>
                  <div className="column-fields">
                    {Object.values(formData.reportRecipients).map((field) =>
                      renderInputField(field, "reportRecipients")
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="special-box">
                  <h2 className="m-2 text-2xl font-bold">Invoice Recipients</h2>
                  <div className="column-fields">
                    {Object.values(formData.invoiceRecipients).map((field) =>
                      renderInputField(field, "invoiceRecipients")
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-start ml-7">
                <div className="special-box mr-7">
                  <h2 className="m-2 mt-4 text-2xl font-bold">New Tests</h2>
                  <div className="">
                    {tests.map((test) => (
                      <div
                        key={test.id}
                        className="flex text-black items-center mb-4 space-x-2"
                      >
                        <input
                          id={test.id}
                          type="checkbox"
                          value={test.name}
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-700 dark:focus:ring-blue-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={handleCheckboxChange}
                          checked={selectedTests.includes(test.id)}
                        />
                        <label
                          htmlFor={test.id}
                          className="text-lg font-medium text-black"
                        >
                          {test.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/*Submit Button*/}
            <div className="flex justify-center">
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>

        {/* Modal for errors */}
        {showErrorModal && (
          <div className="modal show">
            <div className="modal-content">
              <div className="flex items-center justify-between pb-2">
                <h2 className="font-bold">Errors</h2>
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
              </div>
              <hr />
              <ul className="text-red-500 py-2">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Modal for Success */}
        <div
          className={`fixed inset-x-0 bottom-0 flex justify-center transition-transform duration-300 ease-in-out transform ${
            showSuccessfulSubmit ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="bg-green-700 paper text-white max-h-10 w-1/5 flex justify-center items-center rounded-t-md">
            <ul className="text-white text-xl py-2">
              Successfully Submitted Data
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSampleForm;
