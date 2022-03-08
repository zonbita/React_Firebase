import firebase from 'firebase/compat/app'
import React, { useState } from 'react'
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from '@firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database';
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDylVDzI_MaUjM_O1ZoAPBTf7xu9AojdCY",
  authDomain: "contact-app-7a0fe.firebaseapp.com",
  databaseURL: "https://contact-app-7a0fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "contact-app-7a0fe",
  storageBucket: "contact-app-7a0fe.appspot.com",
  messagingSenderId: "726607768481",
  appId: "1:726607768481:web:143c96bf54d54097cd79e0",
  measurementId: "G-2T7V55FEJC"
}

export const QueryFirebase = (collection, condition) => {
  const [documents, setDocuments] = useState([]);

  React.useEffect(() => {
    let Ref = db.collection(collection).orderBy('createdAt');
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        setDocuments([]);
        return;
      }

      Ref = Ref.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }

    const unsubscribe = Ref.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition]);

  return documents;
};



const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth()
firebase.initializeApp(firebaseConfig)
export { db, auth }
export const database = firebase.database();
export default firebase