import React, { useState, useEffect } from "react";
import formData from "../objects/newSample.json";
import NewTest from "./new-test";

const NewSampleForm = () => {
  const [formValues, setFormValues] = useState({});
  const [selectedTests, setSelectedTests] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Log chain of custody details
    console.log("Chain of Custody:");
    console.log(`Chain of Custody: ${formValues.chainOfCustody?.chainOfCustodyCOC || ""}`);
    console.log(`Sample Name: ${formValues.chainOfCustody?.sampleName || ""}`);
    console.log(`Sample Amount: ${formValues.chainOfCustody?.sampleAmount || ""}`);
  
    // Log report to details
    console.log("\nReport To:");
    console.log(`Company: ${formValues.reportTo?.reportToCompany || ""}`);
    console.log(`Contact: ${formValues.reportTo?.reportToContact || ""}`);
    console.log(`Phone: ${formValues.reportTo?.reportToPhone || ""}`);
    console.log(`Street: ${formValues.reportTo?.reportToStreet || ""}`);
    console.log(`City/Province: ${formValues.reportTo?.reportToCity || ""}`);
    console.log(`Postal Code: ${formValues.reportTo?.reportToPostal || ""}`);
  
    // Determine invoice details based on user selection
    console.log("\nInvoice To:");
    if (formValues.invoiceTo?.sameAsReportTo === 'Yes') {
      console.log("Same as Report To");
    }
    if (formValues.invoiceTo?.copyOfInvoiceWithReport === 'Yes') {
      console.log("Copy Invoice with Report");
    }
    console.log(`Company: ${formValues.invoiceTo?.invoiceToCompany || ""}`);
    console.log(`Contact: ${formValues.invoiceTo?.invoiceToContact || ""}`);

  
    // Log report recipients
    console.log("\nReport Recipients:");
    console.log(`Report Format: ${formValues.reportRecipients?.reportFormat || ""}`);
    console.log(`Merge QC/QCI: ${formValues.reportRecipients?.mergeReports || ""}`);
    console.log(`Distribution: ${formValues.reportRecipients?.distribution || ""}`);

    console.log(`Email: ${formValues.reportRecipients?.reportRecipientEmail || ""}`);
    console.log(`Email 2: ${formValues.reportRecipients?.reportRecipientEmail2 || ""}`);
    console.log(`Fax: ${formValues.reportRecipients?.reportRecipientFax || ""}`);
  
    // Log invoice recipients
    console.log("\nInvoice Recipients:");
    console.log(`Distribution: ${formValues.invoiceRecipients?.invoiceDistribution || ""}`);
    console.log(`Email: ${formValues.invoiceRecipients?.invoiceRecipientEmail || ""}`);
    console.log(`Email 2: ${formValues.invoiceRecipients?.invoiceRecipientEmail2 || ""}`);
    console.log(`Fax: ${formValues.invoiceRecipients?.invoiceRecipientFax || ""}`);
  
    // Create samples based on sampleAmount value
    const sampleAmount = parseInt(formValues.chainOfCustody?.sampleAmount || 0);
    if (!isNaN(sampleAmount) && sampleAmount > 0) {
      console.log(`\nCreating ${sampleAmount} samples:`);
      for (let i = 1; i <= sampleAmount; i++) {
        const sampleName = `${formValues.chainOfCustody?.sampleName}${i}`;
        console.log(`${sampleName}:`);
        selectedTests.forEach((testId) => {
          const test = tests.find((test) => test.id === testId);
          if (test) {
            console.log(`  - Test: ${test.name}`);
            // You can add more details or processing related to each test if needed
          }
        });
      }
    } else {
      console.log("Invalid sample amount or not specified.");
    }
    console.log(formValues);
  };

  const tests = [
    { id: "PH/Conductivity", name: "PH/Conductivity" },
    { id: "TSS", name: "TSS" },
    { id: "IC", name: "IC" },
    { id: "Alkalinity", name: "Alkalinity" },
    { id: "TICTOC", name: "TICTOC" },
  ];

  const renderInputField = (field, section) => {
    if (field.type === "text") {
      return (
        <div className="flex justify-between w-72 m-2" key={field.id}>
          <div className="text-center">
            <label className="font-bold mr-2" htmlFor={field.id}>
              {field.label}
            </label>
          </div>
          <div className="text-right">
            <input
              className="w-44 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent pl-2" // Added pl-2 for padding on the left
              type={field.type}
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
      } else if (field.type === "int") {
        return (
          <div className="flex justify-between m-2" key={field.label}>
            <div className="">
              <label className="font-bold mr-2" htmlFor={field.id}>
                {field.label}
              </label>
            </div>
            <div className="flex justify-around flex-grow">
              <input
                className="w-44 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent pl-2"
                type="number"
                id={field.id}
                name={field.name}
                value={formValues[section]?.[field.name] || ""}
                onChange={(e) => handleChange(e, section, field.name)}
                step="1"
                min="0"
              />
            </div>
          </div>
        );
      }
  };

  return (
    <div className="page-container">
      <div className="page-pop px-16">
        <div className="flex justify-center">
          <header className="title">
            <h1>Chain of Custody - New Sample</h1>
          </header>
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
                <h2 className="m-2 text-2xl font-bold">Report To</h2>
                <div className="input-fields">
                  {Object.values(formData.reportTo).map((field) =>
                    renderInputField(field, "reportTo")
                  )}
                </div>
              </div>
              <div className="input-box m-7">
                <h2 className="m-2 text-2xl font-bold">Invoice To</h2>
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
      </div>
    </div>
  );
};

export default NewSampleForm;
