// These are the functions that interact with the database and the API
// These functions can be called from anywhere in the front end
// Update and delete functions are for admin use only
// marked with "ADMIN USE ONLY"


// R E C O R D    F U N C T I O N S

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
// This function will get a single record from the database using the chain of custody number
// This will return all Samples, Tests, and Results associated with the Record
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

// Added by: Nick
// Date: 2024-07-11
// This function will get all records from the database
// This will only return the data from the Record table, this does not include Samples, Tests, or Results
// Can be called anywhere in front end by importing
// Example: import { getAllRecords } from '../_services/dbFunctions';
export const getAllRecords = async () => {
  try {
    const response = await fetch("/api/records", {
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
    console.error("Failed to fetch records:", error);
    throw error;
  }
};

// Added by: Nick
// Date: 2024-07-22
// This function will update a record in the database using the chain of custody number
// Can be called anywhere in front end by importing
// Example: import { updateRecord } from '../_services/dbFunctions';
// ADMIN USE ONLY
export const updateRecord = async (chainOfCustody, record) => {
  try {
    const response = await fetch(`/api/records/${chainOfCustody}`, {
      method: "PATCH",
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
    console.error("Failed to update record:", error);
    throw error;
  }
};

// T E S T    F U N C T I O N S

// Added by: Nick
// Date: 2024-07-19
// This function will get a test from the database using the test ID
// This will return all results associated with the Test
// Can be called anywhere in front end by importing
// Example: import { getTest } from '../_services/dbFunctions';
export const getTest = async (testID) => {
  try {
    const response = await fetch(`/api/tests/${testID}`, {
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
    console.error("Failed to fetch test:", error);
    throw error;
  }
};


// Added by: Nick
// Date: 2024-07-22
// This function will update a test in the database using the test ID
// Can be called anywhere in front end by importing
// Example: import { updateTest } from '../_services/dbFunctions';
// ADMIN USE ONLY
export const updateTest = async (testID, test) => {
  try {
    const response = await fetch(`/api/tests/${testID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Test: test }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update test:", error);
    throw error;
  }
};


// R E S U L T    F U N C T I O N S

// Added by: Nick
// Date: 2024-07-11
// This function will add a result to the specified Result table in the database
// Requires the test ID, result type, and result data
// Can be called anywhere in front end by importing
// Example: import { addTestResult } from '../_services/dbFunctions';
export const addTestResult = async (testID, resultType, resultData) => {
  try {
    const response = await fetch("/api/results", {
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
// Date: 2024-07-23
// This function will update a result in the database using the result ID and result type
// Can be called anywhere in front end by importing
// Example: import { updateTestResult } from '../_services/dbFunctions';
// ADMIN USE ONLY

// basic structure of the parameters:
// 
// resultID = "specificResultID"
// resultType = "PhConResult"
// resultData = 
//   {
//     "ph": "7.4",
//   }
// 
// Note does not require all fields to be updated, only the ones that need to be changed
export const updateTestResult = async (resultID, resultType, resultData) => {
  try {
    const response = await fetch(`/api/results/${resultID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resultID,
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
    console.error("Failed to update test result:", error);
    throw error;
  }
};


// S A M P L E    F U N C T I O N S


// Added by: Nick
// Date: 2024-07-11
// This function will get one sample from the database using the sample ID
// This will return all Tests and Results associated with the Sample
// Can be called anywhere in front end by importing
// Example: import { getSample } from '../_services/dbFunctions';
export const getSample = async (sampleID) => {
  try {
    const response = await fetch(`/api/samples/${sampleID}`, {
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
    console.error("Failed to fetch sample:", error);
    throw error;
  }
};

// Added by: Nick
// Date: 2024-07-30
// This function will get all samples from the database
// This will return all the data from the Sample table, this includes Tests and Results
// Can be called anywhere in front end by importing
// Example: import { getAllSamples } from '../_services/dbFunctions';
export const getAllSamples = async () => {
  try {
    const response = await fetch("/api/samples", {
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
    console.error("Failed to fetch samples:", error);
    throw error;
  }
};

// U S E R    F U N C T I O N S

// Added by: Nick
// Date: 2024-08-01
// This function will get a user from the database using the user ID
// Can be called anywhere in front end by importing
// Example: import { getUser } from '../_services/dbFunctions';
// ADMIN USE ONLY
export const getUser = async (userID) => {
  try {
    const response = await fetch(`/api/users/${userID}`, {
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
    console.error("Failed to fetch user:", error);
    throw error;
  }
};


// Added by: Nick
// Date: 2024-08-01
// This function will get all users from the database
// Can be called anywhere in front end by importing
// Example: import { getAllUsers } from '../_services/dbFunctions';
// ADMIN USE ONLY
export const getAllUsers = async () => {
  try {
    const response = await fetch("/api/users", {
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
    console.error("Failed to fetch users:", error);
    throw error;
  }
};


// Added by: Nick
// Date: 2024-08-01
// This function will update a user in the database using the user ID
// Can be called anywhere in front end by importing
// Example: import { updateUser } from '../_services/dbFunctions';
// ADMIN USE ONLY
export const updateUser = async (userID, user) => {
  try {
    const response = await fetch(`/api/users/${userID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};


// Added by: Nick
// Date: 2024-08-01
// This function will delete a user from the database using the user ID
// Can be called anywhere in front end by importing
// Example: import { deleteUser } from '../_services/dbFunctions';
// ADMIN USE ONLY
export const deleteUser = async (userID) => {
  try {
    const response = await fetch(`/api/users/${userID}`, {
      method: "DELETE",
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
    console.error("Failed to delete user:", error);
    throw error;
  }
};