import { addTestResult } from './dbFunctions';

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
        
    } else {
        console.error('Unknown type:', type);
    }
};

export { formatResultData };