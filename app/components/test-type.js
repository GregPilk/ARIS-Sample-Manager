import React from "react";

const TestTypeSelect = ({ CocRecord, testType, setTestType }) => {
  const options = [
    { value: "", text: "Select a Test Type" },
    { value: "PH Conductivity", text: "PH Conductivity" },
    { value: "HPIC/IC", text: "HPIC/IC" },
    { value: "Alkalinity", text: "Alkalinity" },
    { value: "TOCTIC", text: "TOCTIC" },
    { value: "ICP", text: "ICP" },
    { value: "TSS", text: "TSS" },
  ];

  return (
    <div className="test-navbar m-7">
      <div className="mr-2 font-bold">
        <label>Test Type:</label>
      </div>
      <div>
        <select
          className="border-2 rounded-lg p-3 bg-slate-400 w-44 h-12 text-center hover:bg-slate-500"
          id="dropdown"
          value={testType}
          onChange={(event) => setTestType(event.target.value)}
        >
          {options.map((option) => {
            if (CocRecord[option.value] !== undefined) {
              return (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              );
            }
            return null;
          })}
        </select>
      </div>
    </div>
  );
};

export default TestTypeSelect;
