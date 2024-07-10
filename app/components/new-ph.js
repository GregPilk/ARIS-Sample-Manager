"use client";
import { useState } from "react";

export default function NewPH() {
  const [submitted, setSubmitted] = useState(false);
  const [phTest, setPhTest] = useState({
    temperature: "",
    sampleId: "",
    phLevel: "",
    conductivity: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPhTest((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const inputs = [
    { label: "Temperature", name: "temperature", type: "number" },
    { label: "Sample ID", name: "sampleId", type: "text" },
    { label: "PH", name: "phLevel", type: "text" },
    { label: "Conductivity", name: "conductivity", type: "text" },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>

      {submitted && (
        <div>
          <div>Temperature: {phTest.temperature}</div>
          <div>Sample ID: {phTest.sampleId}</div>
          <div>PH: {phTest.phLevel}</div>
          <div>Conductivity: {phTest.conductivity}</div>
        </div>
      )}
    </div>
  );
}
