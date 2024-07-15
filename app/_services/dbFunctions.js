// These are the functions that interact with the database and the API
// They are called by the components in the app
// The functions are asynchronous and return promises

// Added by: Nick
// Date: 2024-07-11
// This function will add a record to the database
// Can be called anywhere in front end by importing
// Example: import { createRecord } from '../_services/dbFunctions';
export const createRecord = async (record) => {
  try {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Record: record }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create record:", error);
    throw error;
  }
};

// Added by: Nick
// Date: 2024-07-11
// This function will add a result to a specified Test in the database
// Can be called anywhere in front end by importing
// Example: import { addTestResult } from '../_services/dbFunctions';
export const addTestResult = async (testID, resultType, resultData) => {
  try {
    const response = await fetch("/api/add-result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        testID,
        resultType,
        resultData,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add test result:", error);
    throw error;
  }
};

// Added by: Nick
// Date: 2024-07-11
// This function will get a record from the database using the chain of custody number
// This will return all samples, Tests, and Results associated with the Record
// Can be called anywhere in front end by importing
// Example: import { getRecord } from '../_services/dbFunctions';
export const getRecord = async (chainOfCustody) => {
  try {
    const response = await fetch(`/api/records/${chainOfCustody}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch record:", error);
    throw error;
  }
};

};

// Added by: Nick
// Date: 2024-07-11
// This function will get all records from the database
// This will only return the data from the Record table
// Can be called anywhere in front end by importing
// Example: import { getAllRecords } from '../_services/dbFunctions';
export const getAllRecords = async () => {
    try {
        const response = await fetch('/api/records', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error('Failed to fetch records:', error);
        throw error;
    }
};

