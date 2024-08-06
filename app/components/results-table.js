import React, { useState, useEffect } from "react";
import { updateTestResult } from "../_services/dbFunctions";

const ResultsTable = ({
  record,
  selectedSampleType,
  selectedTestType,
  updateRecords,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editableCell, setEditableCell] = useState({
    rowIndex: null,
    cellKey: null,
  });
  const [tempRecord, setTempRecord] = useState({});
  const [resultType, setResultType] = useState("");
  const [results, setResults] = useState([]);

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
            console.log(resultType);
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
      console.log(tempRecord);
    }
  };

  const submitEdits = async () => {
    if (typeof updateRecords === "function") {
      updateRecords(editableCell.rowIndex, tempRecord);
    }

    const { id: resultID, ...updatedValues } = tempRecord;
    const resultData = {
      [editableCell.cellKey]: updatedValues[editableCell.cellKey],
    };

    console.log(resultID, resultType, resultData);

    try {
      const updatedResult = await updateTestResult(
        resultID,
        resultType,
        resultData
      );
      console.log("Test result updated successfully:", updatedResult);
    } catch (error) {
      console.error("AAAAA:", error);
    }
    setTempRecord({});
    setEditMode(false);
    setEditableCell({ rowIndex: null, cellKey: null });
  };

  const saveEdits = () => {
    if (typeof updateRecords === "function") {
      updateRecords(editableCell.rowIndex, tempRecord);
    }
    setTempRecord({});
    setEditMode(false);
    setEditableCell({ rowIndex: null, cellKey: null });
  };

  return (
    <div className="mt-4">
      <div className="flex w-full justify-between">
        <div className="flex justify-start">
          <div className="ml-2">
            {results.length > 0 && (
              <div className="admin-bar paper">
                {/* <button
                  className="edit-button"
                  type="button"
                  onClick={saveEdits}
                >
                  Save
                </button> */}
                <button
                  className="admin-edit-button"
                  type="button"
                  onClick={submitEdits}
                >
                  Submit
                </button>
                <label className="font-bold flex items-center">
                  <input
                    type="checkbox"
                    checked={editMode}
                    onChange={() => setEditMode(!editMode)}
                  />
                  Edit Mode
                </label>
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="hidden">Shh I'm secret</p>
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
                    key={header}
                    style={{
                      borderRight: "1px solid white",
                      borderBottom: "1px solid white",
                    }}
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
        <p className="hidden">No results found for {selectedTestType}.</p>
      )}
    </div>
  );
};

export default ResultsTable;
