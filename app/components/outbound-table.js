import React, { useState } from "react";

// Added by: Greg
// Date: 2024-07-16
// This component is used to display the results of a test before it is added to the database.
const OutboundTable = ({ records, selectedTestType, updateRecords }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableRecordIndex, setEditableRecordIndex] = useState(null);
  const [tempRecord, setTempRecord] = useState({});

  const headers =
    records.length > 0
      ? Object.keys(records[0]).filter(
          (key) =>
            key !== "id" &&
            key !== "testID" &&
            key !== "PhConResults" &&
            key !== "TSSResults"
        )
      : [];

  const handleRowClick = (index) => {
    if (editMode) {
      setEditableRecordIndex(index);
      setTempRecord({ ...records[index] }); // Initialize tempRecord with the values of the clicked record
    }
  };

  const saveEdits = () => {
    if (typeof updateRecords === "function") {
      updateRecords(editableRecordIndex, tempRecord);
    }
    setTempRecord({}); // Clear the temporary record
    setEditMode(false); // Turn off edit mode
    setEditableRecordIndex(null); // Reset editable index
  };

  return (
    <div className="mt-8">
      <div className="flex justify-end">
        <div className="mr-4">
          {records.length > 0 ? (
            <div className="edit-bar paper">
              <button className="edit-button" type="button" onClick={saveEdits}>
                Save
              </button>
              <label className="font-bold flex items-center">
                <input
                  type="checkbox"
                  checked={editMode}
                  className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-700 dark:focus:ring-blue-800 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={() => {
                    setEditMode(!editMode);
                    setEditableRecordIndex(null); // Reset editable index when toggling mode
                  }}
                />
                Edit
              </label>
            </div>
          ) : (
            <p className="hidden">I don't exist{selectedTestType}.</p>
          )}
        </div>
      </div>
      {records.length > 0 ? (
        <table className="table-auto w-full border-collapse rounded-md overflow-hidden shadow-lg">
          <thead className="font-bold text-center bg-slate-600 paper py-2 rounded-t-md">
            <tr>
              {headers.map((header) => (
                <th key={header} className="border-r border-white">
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={index}
                className={`text-center px-4 paper rounded-md ${
                  index % 2 === 0 ? "bg-green-700" : "bg-green-900"
                } ${editMode ? "cursor-pointer" : ""}`}
                onClick={() => handleRowClick(index)}
              >
                {headers.map((header) => (
                  <td key={header} className="border-r border-b border-white">
                    {editableRecordIndex === index ? (
                      <input
                        className="w-28 overflow-scroll"
                        type="text"
                        value={tempRecord[header] || ""}
                        onChange={(e) =>
                          setTempRecord({
                            ...tempRecord,
                            [header]: e.target.value,
                          })
                        }
                      />
                    ) : (
                      record[header]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default OutboundTable;
