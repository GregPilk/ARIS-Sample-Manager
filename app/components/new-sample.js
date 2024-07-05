import React, { useState, useEffect } from "react";
import formData from "../objects/newSample.json";

const NewSampleForm = () => {
  const [formValues, setFormValues] = useState({});

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

  const renderInputField = (field, section) => {
    if (field.type === "text") {
      return (
        <div className="flex justify-between w-72 m-2" key={field.id}>
          <div className="text-left">
            <label className="font-bold" htmlFor={field.id}>
              {field.label}
            </label>
          </div>
          <div className="text-right">
            <input
              className="w-44 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
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
            <label className="font-bold" htmlFor={field.id}>
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

  return (
    <div className="page-container">
      <div className="page-pop px-16">
        <div className="flex justify-center">
          <header className="title">
            <h1>Chain of Custody - New Sample</h1>
          </header>
        </div>
        <form>
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
            <div className="flex">
              <div className="flex justify-start ml-7">
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
              <div className="flex flex-col">
                <div className="special-box">
                  <h2 className="m-2 text-2xl font-bold">Invoice Recipients</h2>
                  <div className="column-fields">
                    {Object.values(formData.invoiceRecipients).map((field) =>
                      renderInputField(field, "invoiceRecipients")
                    )}
                  </div>
                </div>
                <div className="itty-box">
                  <h2 className="m-2 text-2xl font-bold">Chain of Custody</h2>
                  <div className="input-fields">
                    {Object.values(formData.chainOfCustody).map((field) =>
                      renderInputField(field, "chainOfCustody")
                    )}
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
