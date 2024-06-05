
import React, { createContext, useState, useContext,useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext();
// this context will hold the 'userType' state and function to update it 

// Create a provider component
export const AuthProvider = ({ children }) => {
     // state to be global
     // It is a provider component
     const [userType, setUserType] = useState('');
     // use a state to manage the authenticity
     const [isAuth, setAuth] = useState(false)
     // use the token as well
     const [token, setToken] = useState('')


     useEffect(() => {
          // get the token if it has
          const savedToken = localStorage.getItem('token')
          // get the userType if the localStorage has
          const savedUserType = localStorage.getItem('userType')
          // if both found
          if (savedToken && savedUserType) {
               // do update the userType
               setUserType(savedUserType)
               // do update the authenticity
               setAuth(true)
               // do update the token
               setToken(savedToken)
          }
     }, []) // and this will run only one time

     const logout = () => {
          // if click on logout it remove the token from localStorage
          localStorage.removeItem('token')
          // also do remove userType as well
          localStorage.removeItem('userType')
          // make the token state empty
          setToken('')
          // make the authenticity false
          setAuth(false)
          // make the usertype to null
          setUserType('')
     }
     // on login it will accept two args i.e. token and userState
     const login = (newToken, newUserType) => {
          // token will be stored in the local storage 
          localStorage.setItem('token', newToken)
          //just to validate
          // console.log(newToken)
          // user type will also be stored in the localStorage
          localStorage.setItem('UserType', newUserType)
          // just to validate
          // console.log(newUserType)
          // update the token state
          setToken(newToken)
          // update the usertype state
          setUserType(newUserType)
          // update the authenticity to true as they are login now
          setAuth(true)
     }
     return (
          <AuthContext.Provider value={{ userType, setUserType, login, logout, token, isAuth }}>
               {/* Pass the values that will pass to its childern. Here userType is the value of user and setUserType is a function to update the userType. Handled in Login and signup page */}
               {children}
               {/* childrent represent any component wrapped by this provide. Here AuthProvider is wrapped in the main.jsx and inside it their is a componetn of <App/> that will assume as children and will get access to this state. Infact any component inside App will get. Inside App we have Home component and inside it we have multiple component and all will get access to that state */}
          </AuthContext.Provider>
     );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
     return useContext(AuthContext);
     // custom hook that uses 'useContext' to access the 'AuthContext' and return its value.
};
