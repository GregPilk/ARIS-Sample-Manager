import React from "react";

const ResultsTable = ({ record, selectedSampleType, selectedTestType }) => {
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
          if (test[resultPropertyName]) {
            results.push(...test[resultPropertyName]);
          }
        }
      });
    });
    return results;
  };

  const results = extractResults();

  // Dynamically determine the headers based on the results
  //   const headers = results.length > 0 ? Object.keys(results[0]) : [];
  const headers =
    results.length > 0
      ? Object.keys(results[0]).filter(
          (key) => key !== "id" && key !== "testID"
        )
      : [];

  return (
    <div className="mt-4">
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
            {results.map((result, index) => (
              <tr
                key={index}
                className={`text-center px-4 rounded-md ${
                  index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
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
                    {result[header]}
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
