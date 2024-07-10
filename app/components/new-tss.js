"use client";
import { useState } from "react";

export default function NewTSS() {
  const [submitted, setSubmitted] = useState(false);
  const [tssTest, setTssTest] = useState({
    sampleID: "",
    tssLevel: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTssTest((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const inputs = [
    { label: "Sample ID", name: "sampleID", type: "text" },
    { label: "TSS in mg/L", name: "tssLevel", type: "text" },
  ];

  return (
    <div>
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
        <div className="flex justify-center mt-4">
          <button
            className="submit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>

      {submitted && (
        <div className="mt-4">
          <div>Sample ID: {tssTest.sampleID}</div>
          <div>TSS: {tssTest.tssLevel}</div>
        </div>
      )}
    </div>
  );
}
