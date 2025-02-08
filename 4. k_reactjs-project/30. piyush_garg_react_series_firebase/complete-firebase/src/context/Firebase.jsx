import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set, get, child, onValue } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDOpxaFJVIQks5r2lvI7Mha9OR3Np8B06o",
    authDomain: "learning-firebase-ba5eb.firebaseapp.com",
    projectId: "learning-firebase-ba5eb",
    storageBucket: "learning-firebase-ba5eb.appspot.com",
    messagingSenderId: "293782755231",
    appId: "1:293782755231:web:a88057ae538afb6bbd8faa",
    databaseURL: "https://learning-firebase-ba5eb-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const dbRef = ref(getDatabase())

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [name, setName] = useState();

    const signUpWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, email, password).then(value => console.log(value)).catch(err => console.log(err))
    }

    const signInWithEmailAndPasswordFunc = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password).then(value => console.log(value)).catch(err => console.log(err))
    }

    const putData = (key, data) => {
        set(ref(database, key), data)
            .then(() => console.log('Data successfully written!'))
            .catch(err => console.log('Error writing data:', err));
    }
    const getDataFromRealDB = (key) => {
        // console.log(key)
        return get(child(ref(database), key))
            // return get(child(dbRef, key))
            .then(snapshot => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                } else {
                    console.log('No data available');
                }
            })
            .catch(err => console.log(err));
    }

    const signUpwithGoogle = () => {
        signInWithPopup(firebaseAuth, googleProvider).then(value => console.log(value)).catch(val => console.log(val))
    }

    const logOut = () => {
        signOut(firebaseAuth)
            .then(() => console.log('User signed out!'))
            .catch(err => console.log('Error signing out:', err));
    }

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser(user)
            } else {
                // console.log('you logged out');
                setUser(null)
            }
        })
        onValue(ref(database, 'user/data'), (snapshot) => setName(snapshot.val().name)
        )
    }, [])

    return <FirebaseContext.Provider
        value={{
            signUpWithEmailAndPassword, signInWithEmailAndPasswordFunc,
            putData,
            signUpwithGoogle,
            logOut,
            user,
            getDataFromRealDB,
        }}>
        <h3> my name {name}</h3>
        {children}
    </FirebaseContext.Provider>
}

const useFirebaseContext = () => {
    return useContext(FirebaseContext)
}


export { FirebaseProvider, useFirebaseContext }