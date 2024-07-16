"use client";
import { useState, useEffect } from "react";

export default function NewTSS({ record, setOutbound }) {
  const [submitted, setSubmitted] = useState(false);
  const [outboundResults, setOutboundResults] = useState([]);
  const [tssTest, setTssTest] = useState({
    testID: "",
    tssResults: "",
    tssInMgl: "",
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
        if (test.name === "TSS") {
          results.push(test);
        }
      });
    });
    return results;
  };

  const results = extractResults();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTssTest((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOutboundResult = [
      {
        testID: results[0].id,
        tssResults: "tssResults",
        tssInMgl: tssTest.tssInMgl,
      },
    ];

    const updatedOutboundResults = [...outboundResults, ...newOutboundResult];
    setOutboundResults(updatedOutboundResults);

    // Use the updated array directly
    setOutbound(updatedOutboundResults);
    // console.log(updatedOutboundResults);

    // Optionally reset the phTest state or handle other post-submit logic
    setTssTest({
      testID: "",
      tssResults: "tssResults",
      tssInMgl: "",
    });

    setSubmitted(true);
  };

  const inputs = [{ label: "TSS mg/L", name: "tssInMgl", type: "text" }];

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
                value={tssTest[input.name]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="add-button" type="submit">
            Add Another Test
          </button>
        </div>
      </form>

      {/* {submitted && (
        <div className="mt-4">
          <div>TSS: {tssTest.tssInMgl}</div>
          <pre>{JSON.stringify(outboundResults, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}
