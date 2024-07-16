"use client";
import { use, useState, useEffect } from "react";

// Created By: Sarah
// Date: 2024-06-10
// Edited By: Greg
// Date: 2024-07-15
// The component will be used for adding new PH/Conductivity test data to the database
// The component will render a form for the user to input the PH and Conductivity test data

export default function NewPH({ record, setOutbound }) {
  const [submitted, setSubmitted] = useState(false);
  const [outboundResults, setOutboundResults] = useState([]);
  const [phTest, setPhTest] = useState({
    testID: "",
    phConResults: "",
    ph: "",
    conductivity: "",
  });

  useEffect(() => {
    setOutboundResults([]);
  }, [record]);

  const extractResults = () => {
    if (!record || !record.samples) {
      return [];
    }
    const results = [];
    record.samples.forEach((sample) => {
      sample.tests.forEach((test) => {
        if (test.name === "PH/Conductivity") {
          results.push(test);
        }
      });
    });
    return results;
  };

  const results = extractResults();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPhTest((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Create a new object for the outboundResults
    const newOutboundResult = [
      {
        testID: results[0].id,
        phConResults: "phConResults",
        ph: phTest.ph,
        conductivity: phTest.conductivity,
      },
    ];
    // console.log(newOutboundResult);

    // Update the outboundResults state with the new object
    const updatedOutboundResults = [...outboundResults, ...newOutboundResult];
    setOutboundResults(updatedOutboundResults);

    // Use the updated array directly
    setOutbound(updatedOutboundResults);
    // console.log(updatedOutboundResults);

    // Reset the phTest state or handle other post-submit logic
    setPhTest({
      testID: "",
      phConResults: "phConResults",
      ph: "",
      conductivity: "",
    });

    setSubmitted(true);
  };

  const inputs = [
    { label: "PH", name: "ph", type: "text" },
    { label: "Conductivity", name: "conductivity", type: "text" },
  ];

  return (
    <div className="flex justify-center my-5">
      <form>
        <div className="special-box p-8">
          {inputs.map((input) => (
            <div
              key={input.name}
              className="grid grid-cols-2 gap-4 items-center"
            >
              <label className="font-bold mr-8 text-right">{input.label}</label>
              <input
                className="w-full rounded-md m-2 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                type={input.type}
                name={input.name}
                value={phTest[input.name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="add-button" onClick={handleSubmit}>
            Add Test
          </button>
        </div>
      </form>

      {/* {submitted && (
        <div>
          <div>ID: {results[0].id}</div>
          <div>PH: {phTest.ph}</div>
          <div>Conductivity: {phTest.conductivity}</div>
          <pre>{JSON.stringify(outboundResults, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}
