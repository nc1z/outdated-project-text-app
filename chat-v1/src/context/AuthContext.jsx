import { createContext, useContext, useState, useEffect } from "react";
import { auth } from '../firebase';
import {
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});

    // Logout function that runs Firebase Auth signOut
    const logOut = () => {
        return signOut(auth)
      }

    // When Auth State Changes, this lifecycle hook will trigger and update the user state.
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    },[]);

    return (
        <UserContext.Provider value={{logOut, user}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext);
};