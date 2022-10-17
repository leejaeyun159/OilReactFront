import { createContext, useState } from "react";

const OilContext = createContext({
    token:'',
    isLoggedIn: false,
    login: (token) =>{},
    logout: () =>{}
});

export const AuthContextProvider = (props) =>{
    const [token, setToken] = useState(null);

    const userLoggedIn = !!token;
    
    const loginHandler = (token) => { setToken(token) };

    const logoutHandler = () =>{ setToken(null) };

    const contextValue = {
      token: token,
      isLoggedIn: userLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    };

    return (<OilContext.Provider value={contextValue}>
        {props.children}
        </OilContext.Provider>);
} 

export default OilContext;