import { addTestResult } from './dbFunctions';

// Added by Nick Ryan and Sarah
// Date: 2024-07-11
// This function will format the data from the CSV file and save it to the database
// This function will be called in the CsvReader component
// Example: formatResultData(csvData, resultTestID, type);
const formatResultData = async (data, resultTestID, type) => {
    const result = {
        testID: resultTestID,
        resultType: type,
        resultData: {},
    };

    if (type === 'AlkalinityResult') {
        data.forEach((row) => {
            result.resultData = {
                methodName: row["Method name"],
                ID1value: row["ID1.Value"],
                RS01name: row["RS01.Name"],
                RS01value: row["RS01.Value"],
                RS01unit: row["RS01.Unit"],
                sampleSizeValue: row["Sample size.Value"],
                unitValue: row["Unit.Value"],
                remarks: row["Remarks"],
                RS02name: row["RS02.Name"],
                RS02value: row["RS02.Value"],
                RS02unit: row["RS02.Unit"],
                RS02meanValue: row["RS02.Mean value"],
                determinationStart: row["Determination start"],
            };
            addTestResult(result.testID, result.resultType, result.resultData);
        });
        
    }
    else if (type === 'TICTOCResult') { 
        data.forEach((row) => {
            result.resultData = {
                type: row["Type"],
                analogy: row["Anal."],
                resultTOC: row["Result(TOC)"],
                resultTC: row["Result(TC)"],
                resultIC: row["Result(IC)"],
                resultPOC: row["Result(POC)"],
                resultNPOC: row["Result(NPOC)"],
                resultTN: row["Result(TN)"],
                unit: row["Unit"],
                vial: row["Vial"],

            };
            addTestResult(result.testID, result.resultType, result.resultData);
        });
    }
    else if (type === 'ICResult') {
        data.forEach((row) => {
            result.resultData = {
                determinationStart: row["Determination start"],
                ident: row["Ident"],
                methodName: row["Method name"],
                infoOne: row["Info 1"],
                anionsChlorideConcentration: row["Anions.Chloride.Concentration"],
                anionsSulfateConcentration: row["Anions.Sulfate.Concentration"],
            };
            addTestResult(result.testID, result.resultType, result.resultData);
        });
    }
    else {
        console.error('Unknown type:', type);
    }
};

export { formatResultData };