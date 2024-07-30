// import React from "react";
import React, { useState, useEffect } from "react";
import CustomDropdown from "@/app/components/custom-dropdown";

// Added by: Greg
// Date: 2024-07-15
// Component to select a Chain of Custody ID from the list of records
// From the list of records, the user can select a Chain of Custody ID
// The selected Chain of Custody is set as the record in the parent component
const COCSelect = ({ getRecord, getAllRecords, setRecord }) => {
  const [error, setError] = useState(null);
  const [chainOfCustody, setChainOfCustody] = useState("");
  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchAllRecords = async () => {
      try {
        const fetchedRecords = await getAllRecords();
        if (isMounted) {
          setAllRecords(fetchedRecords);
        }
      } catch (error) {
        if (isMounted) setError(error.message);
      }
    };
    fetchAllRecords();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchRecord = async () => {
      if (chainOfCustody) {
        try {
          const recordData = await getRecord(chainOfCustody);
          setRecord(recordData);
          if (isMounted) setRecord(recordData);
          // console.log(recordData);
        } catch (error) {
          if (isMounted) setError(error.message);
        }
      }
    };
    fetchRecord();
    return () => {
      isMounted = false;
    };
  }, [chainOfCustody, getRecord]);

  return (
    <div className="flex m-7 items-center">
      <div className="mr-2 font-bold">
        <label htmlFor="chainOfCustody">Chain of Custody:</label>
      </div>
      <div>
        <CustomDropdown
          allRecords={allRecords}
          setChainOfCustody={setChainOfCustody}
        />
      </div>
    </div>
  );
};

// Added by: Greg
// Date: 2024-07-11
// Component to select a sample ID from the list of samples from CoC Record
// This component will be used to select a sample ID from the list of samples

const SampleIDSelect = ({
  CocRecord,
  selectedSampleID,
  setSelectedSampleID,
}) => {
  const sampleIDs =
    CocRecord && CocRecord.samples
      ? CocRecord.samples.map((sample) => sample.sampleID)
      : [];

  return (
    <div className="flex m-7 items-center">
      <div className="mr-2 font-bold">
        <label>Sample ID:</label>
      </div>
      <div>
        <select
          className="custom-drop"
          value={selectedSampleID}
          onChange={(event) => setSelectedSampleID(event.target.value)}
        >
          <option value="">Select a Sample</option>
          {sampleIDs.map((id) => (
            <option className="dropdown-options" key={id} value={id}>
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
    if (!CocRecord || !CocRecord.samples) return false;
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
          className="custom-drop"
          id="dropdown"
          value={testType}
          onChange={(event) => setTestType(event.target.value)}
        >
          <option value="">Select a Test</option>
          {options.map((option) => {
            if (isTestTypeInSelectedSample(option.value)) {
              return (
                <option
                  className="dropdown-options"
                  key={option.value}
                  value={option.value}
                >
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

export { COCSelect, SampleIDSelect, TestTypeSelect };