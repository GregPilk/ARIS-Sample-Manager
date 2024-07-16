import React from "react";

const OutboundTable = ({ records, selectedTestType }) => {
  // Dynamically determine the headers based on the results
  //   const headers = results.length > 0 ? Object.keys(results[0]) : [];
  const headers =
    records.length > 0
      ? Object.keys(records[0]).filter(
          (key) => key !== "id" && key !== "testID"
        )
      : [];

  return (
    <div className="mt-8">
      {records.length > 0 ? (
        <table className="table-auto w-full border-collapse rounded-md overflow-hidden shadow-lg">
          <thead className="font-bold text-center bg-slate-600 paper py-2 rounded-t-md">
            <tr>
              {headers.map((header) => (
                <th key={header} style={{ borderRight: "1px solid white" }}>
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
                }`}
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    style={{
                      borderRight: "1px solid white",
                      borderBottom: "1px solid white",
                    }}
                  >
                    {record[header]}
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

export default OutboundTable;
