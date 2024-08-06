import React, { useState, useEffect } from "react";
import { updateTestResult } from "../_services/dbFunctions";

const ResultsTable = ({ record, selectedSampleType, selectedTestType }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableCell, setEditableCell] = useState({
    rowIndex: null,
    cellKey: null,
  });
  const [tempRecord, setTempRecord] = useState({});
  const [resultType, setResultType] = useState("");
  const [results, setResults] = useState([]);
  const [showSuccessfulSubmit, setShowSuccessfulSubmit] = useState(false);

  useEffect(() => {
    if (showSuccessfulSubmit) {
      const timer = setTimeout(() => {
        setShowSuccessfulSubmit(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessfulSubmit]);

  function capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    const extractResults = () => {
      if (!record || !record.samples) {
        return [];
      }
      const results = [];
      record.samples.forEach((sample) => {
        sample.tests.forEach((test) => {
          if (test.sampleID === selectedSampleType) {
            var resultPropertyName = `${selectedTestType.toLowerCase()}Results`;
            if (resultPropertyName === "ph/conductivityResults") {
              resultPropertyName = "phConResults";
            }
            const fixedResultName = capitalizeFirstLetter(
              resultPropertyName.slice(0, -1)
            );
            setResultType(fixedResultName);
            if (test[resultPropertyName]) {
              results.push(...test[resultPropertyName]);
            }
          }
        });
      });

      return results;
    };

    setResults(extractResults());
  }, [record, selectedSampleType, selectedTestType]);

  const headers =
    results.length > 0
      ? Object.keys(results[0]).filter(
          (key) => key !== "id" && key !== "testID"
        )
      : [];

  const handleCellClick = (rowIndex, cellKey) => {
    if (editMode) {
      setEditableCell({ rowIndex, cellKey });
      setTempRecord({ ...results[rowIndex] });
    }
  };
  const updateRecords = (index, newRecord) => {
    const updatedResults = [...results];
    updatedResults[index] = newRecord;
    setResults(updatedResults);
  };
  const submitEdits = async () => {
    if (typeof updateRecords === "function") {
      updateRecords(editableCell.rowIndex, tempRecord);
    }

    const { id: resultID, ...updatedValues } = tempRecord;
    const resultData = {
      [editableCell.cellKey]: updatedValues[editableCell.cellKey],
    };

    try {
      await updateTestResult(resultID, resultType, resultData);
      setShowSuccessfulSubmit(true);
    } catch (error) {
      console.error("Failed to update test result:", error);
    }

    setTempRecord({});
    setEditMode(false);
    setEditableCell({ rowIndex: null, cellKey: null });
  };

  return (
    <div className="mt-4">
      <div className="flex w-full justify-between">
        {/* Admin Edit Mode */}
        <div className="flex justify-start">
          <div className="ml-2">
            {results.length > 0 && (
              <div className="edit-bar paper">
                <button
                  className="admin-edit-button"
                  type="button"
                  onClick={submitEdits}
                >
                  Submit
                </button>
                <label className="font-bold flex items-center">
                  <input
                    className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-700 dark:focus:ring-blue-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    checked={editMode}
                    onChange={() => setEditMode(!editMode)}
                  />
                  Edit
                </label>
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="hidden">
            Shh I'm secret - This Section should be used for User Change
            Requests
          </p>
        </div>
      </div>
      {results.length > 0 ? (
        <table className="table-auto w-full border-collapse rounded-md overflow-hidden shadow-lg">
          <thead className="font-bold text-center bg-slate-500 paper py-2 rounded-t-md">
            <tr>
              {headers.map((header) => (
                <th key={header} style={{ borderRight: "1px solid white" }}>
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result, rowIndex) => (
              <tr
                key={rowIndex}
                className={`text-center px-4 rounded-md ${
                  rowIndex % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
                }`}
              >
                {headers.map((header) => (
                  <td
                    className="border-r border-b border-white"
                    key={header}
                    onClick={() => handleCellClick(rowIndex, header)}
                  >
                    {editMode &&
                    editableCell.rowIndex === rowIndex &&
                    editableCell.cellKey === header ? (
                      <input
                        type="text"
                        value={tempRecord[header]}
                        onChange={(e) =>
                          setTempRecord({
                            ...tempRecord,
                            [header]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      result[header]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="hidden">No results found</p>
      )}
      {/* Modal for Success */}
      <div
        className={`fixed inset-x-0 bottom-0 flex justify-center transition-transform duration-300 ease-in-out transform ${
          showSuccessfulSubmit ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-green-700 paper text-white max-h-10 w-1/4 flex justify-center items-center rounded-t-md">
          <ul className="text-white text-xl py-2">Successfully Edited Data</ul>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
