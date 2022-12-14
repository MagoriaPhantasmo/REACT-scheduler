
import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, connectAuthEmulator, signInWithCredential } from 'firebase/auth';



const firebaseConfig = {

  apiKey: "AIzaSyApDuLF_ejbUgcK4E27FJsTxqRMeA3kRao",

  authDomain: "react-scheduler-ca436.firebaseapp.com",

  databaseURL: "https://react-scheduler-ca436-default-rtdb.firebaseio.com",

  projectId: "react-scheduler-ca436",

  storageBucket: "react-scheduler-ca436.appspot.com",

  messagingSenderId: "1096973138464",

  appId: "1:1096973138464:web:6e1b3bab73dcf168ccda45",

  measurementId: "G-QM5679X7SY"

};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);


if (!window.EMULATION && import.meta.env.VITE_EMULATE) {
  
  connectAuthEmulator(auth, "http://localhost:9099");
  connectDatabaseEmulator(database, "localhost", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "WS8D6OxxsFkupB4EQ7193kO3uJh0", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
  
  window.EMULATION = true;
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ));

  return user;
};