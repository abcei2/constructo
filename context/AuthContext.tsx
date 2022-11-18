import { useState, createContext, useContext, ReactNode}  from "react";

import { auth } from "../db/firebase";
import { setPersistence, signInWithPopup, onAuthStateChanged, browserLocalPersistence, GoogleAuthProvider } from "firebase/auth";
import { User } from "../types/dbTypes";


// Inside AuthProvider
const provider = new GoogleAuthProvider();



type authContextType = {
    user: User|undefined;
    login: () => void;
    logout: () => void;
};

const authContextDefaultValues: authContextType = {
    user: undefined,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User>();
    onAuthStateChanged(auth,userInfo=>{
        if(user && !userInfo){
            setUser(undefined);
        }else if(!user && userInfo){
            setUser({id:userInfo.uid,name:userInfo.displayName?userInfo.displayName:"",email:userInfo.email || ""});
        }
    })
    const login = () => {
        
        setPersistence(auth,browserLocalPersistence)
        .then(async function() {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return await signInWithPopup( auth,provider )
            .then(()=>{
            })
            .catch( err => {
              console.log( 1, err )            
            });
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
          });

       
    };
    

    const logout = () => {
        auth.signOut();
        console.log("logout");
    };

    const value = {
        user,
        login,
        logout,
    };
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}



