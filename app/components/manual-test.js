"use client";
import { useState, useEffect } from "react";

// added by: Greg
// date: 2024-07-26
// This component is used to manually add test data to a sample.
// Meant to replace new-ph.js and new-tss.js but is not yet fully implemented.

export default function ManualTest({
  record,
  setOutbound,
  sampleID,
  testType,
}) {
  const [submitted, setSubmitted] = useState(false);
  const [outboundResults, setOutboundResults] = useState([]);
  const [test, setTest] = useState({
    testID: "",
    results: "",
    value1: "",
    value2: "",
  });

  useEffect(() => {
    setOutboundResults([]);
  }, [record, testType]);

  const extractResults = () => {
    if (!record || !record.samples) {
      return [];
    }
    const results = [];
    record.samples.forEach((sample) => {
      if (sample.sampleID === sampleID) {
        sample.tests.forEach((test) => {
          if (test.name === testType) {
            results.push(test);
          }
        });
      }
    });
    return results;
  };

  const results = extractResults();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTest((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOutboundResult = [
      {
        testID: results[0].id,
        results: testType === "PH/Conductivity" ? "PhConResults" : "TSSResults",
        value1: test.value1,
        value2: test.value2,
      },
    ];
    const updatedOutboundResults = [...outboundResults, ...newOutboundResult];
    setOutboundResults(updatedOutboundResults);
    setOutbound(updatedOutboundResults);
    setTest({
      testID: "",
      results: testType === "PH/Conductivity" ? "PhConResults" : "TSSResults",
      value1: "",
      value2: "",
    });
    setSubmitted(true);
  };

  const inputs =
    testType === "PH/Conductivity"
      ? [
          { label: "PH", name: "value1", type: "text" },
          { label: "Conductivity", name: "value2", type: "text" },
        ]
      : [{ label: "TSS mg/L", name: "value1", type: "text" }];

  return (
    <div className="flex justify-center my-5">
      <form onSubmit={handleSubmit}>
        <div className="special-box p-8">
          {inputs.map((input) => (
            <div
              key={input.name}
              className="grid grid-cols-2 gap-4 items-center my-2"
            >
              <label className="font-bold mr-8 text-right">{input.label}</label>
              <input
                className="w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                type={input.type}
                name={input.name}
                value={test[input.name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="add-button" type="submit">
            Add Test
          </button>
        </div>
      </form>
      {/* {submitted && (
        <div className="mt-4">
          <div>{testType}: {test.value1} {testType === "PH/Conductivity" && `, Conductivity: ${test.value2}`}</div>
          <pre>{JSON.stringify(outboundResults, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}
