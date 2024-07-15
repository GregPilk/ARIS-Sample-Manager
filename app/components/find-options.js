import React from "react";

// Added by: Greg
// Date: 2024-07-11
// Component to select a sample ID from the list of samples from CoC Record
// This component will be used to select a sample ID from the list of samples

const SampleIDSelect = ({
  CocRecord,
  selectedSampleID,
  setSelectedSampleID,
}) => {
  const sampleIDs = CocRecord.samples.map((sample) => sample.sampleID);

  return (
    <div className="flex m-7 items-center">
      <div className="mr-2 font-bold">
        <label>Sample ID:</label>
      </div>
      <div>
        <select
          className="border-2 rounded-lg p-3 bg-slate-400 w-44 h-12 text-center hover:bg-slate-500"
          value={selectedSampleID}
          onChange={(event) => setSelectedSampleID(event.target.value)}
        >
          <option value="">Select a Sample</option>
          {sampleIDs.map((id) => (
            <option key={id} value={id}>
              {id.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

// Added by: Greg
// Date: 2024-07-11
// This component will be used to select a test type from the list of tests
// The tests will be filtered based on the selected sample ID
const TestTypeSelect = ({
  CocRecord,
  testType,
  setTestType,
  selectedSampleID,
}) => {
  const options = [
    { value: "PH/Conductivity", text: "PH/Conductivity" },
    { value: "TSS", text: "TSS" },
    { value: "IC", text: "IC" },
    { value: "Alkalinity", text: "Alkalinity" },
    { value: "TICTOC", text: "TICTOC" },
  ];

  // Function to check if the testType is present in the selected sample's tests
  const isTestTypeInSelectedSample = (testType) => {
    const selectedSample = CocRecord.samples.find(
      (sample) => sample.sampleID === selectedSampleID
    );
    if (!selectedSample) return false;
    return selectedSample.tests.some((test) => test.name.includes(testType));
  };

  return (
    <div className="flex m-7 items-center">
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
          <option value="">Select a Test</option>
          {options.map((option) => {
            if (isTestTypeInSelectedSample(option.value)) {
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

export { SampleIDSelect, TestTypeSelect };
