import { db } from "../_utils/firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

export const insertData = async (data, id) => {
  try {
    const docRef = doc(db, 'ChainOfCustodyReports', id);
    await setDoc(docRef, data);
    console.log("Data successfully written to Firestore!");
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getData = async (id) => {
    const docRef = doc(db, 'ChainOfCustodyReports', id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data(); // return the document data
    } else {
      console.log("No such document!");
      return null; // return null if no such document exists
    }
  };