
import React, { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();
// this context will hold the 'userType' state and function to update it 

// Create a provider component
export const AuthProvider = ({ children }) => {
     // It is a provider component
    const [userType, setUserType] = useState('');
     // state to be global
    return (
        <AuthContext.Provider value={{ userType, setUserType }}>
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
