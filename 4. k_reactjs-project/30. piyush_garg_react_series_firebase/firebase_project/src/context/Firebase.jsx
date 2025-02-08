import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyCGjhFbGjYsVOHxSKr8Zqs1e9Eg0QK_Ufg",
    authDomain: "bookify-4e35b.firebaseapp.com",
    projectId: "bookify-4e35b",
    storageBucket: "bookify-4e35b.appspot.com",
    messagingSenderId: "150248239835",
    appId: "1:150248239835:web:f03615cf41593c09d392fe"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();



export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const signUpUserWithEmailAndPassword = async (email, password) => {
        let result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        console.log(result)
    }
    const signINUserWithEmailAndPassword = async (email, password) => {
        let result = await signInWithEmailAndPassword(firebaseAuth, email, password);
        console.log(result)
    }

    const signInWithGoogle = async () => {
        let result = await signInWithPopup(firebaseAuth, googleProvider);
        console.log(result)
    }

    const isLoggedIn = user ? true : false;

    const logOut = () => {
        return signOut(firebaseAuth);
    }

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            // console.log(user)
            if (user) setUser(user);
            else setUser(null)
        })
    })
    return <FirebaseContext.Provider value={{ signUpUserWithEmailAndPassword, signINUserWithEmailAndPassword, signInWithGoogle, isLoggedIn, logOut }}>
        {children}
    </FirebaseContext.Provider>
}

export const useFirebase = () => {
    return useContext(FirebaseContext);
}