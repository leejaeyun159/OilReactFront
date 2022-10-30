import { createContext, useState, useEffect, useCallback } from "react";

let logoutTimer;

const OilContext = createContext({
    token:'',
    isLoggedIn: false,
    login: (token) =>{},
    logout: () =>{}
});

const calculateRemainingTime = (expiractionTime) =>{
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expiractionTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retieveStoredToken =()=>{ //로컬에 이미 토큰이 있을 때
  const storedToken = localStorage.getItem('USER_TOKEN');
  const storedExpirationDate = localStorage.getItem('EXPIRATION_TIME');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if(remainingTime <= 3600) //로컬스토리지에 토큰이 만료되었다면
  {
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem('EXPIRATION_TIME')
  }
  return { //로컬스토리지에 토큰이 만료되지 않았다면
    token:storedToken,
    duration:remainingTime
    }
  }

export const AuthContextProvider = (props) =>{
    const tokenData = retieveStoredToken();
    let initialToken
    if(tokenData){ 
      initialToken = tokenData.token; 
    }

    const [token, setToken] = useState(initialToken);

    const userLoggedIn = !!token;
    
    const loginHandler = (token,expirationTime) => { 
      setToken(token);
      localStorage.setItem('USER_TOKEN', token); 
      localStorage.setItem('EXPIRATION_TIME', expirationTime); //만료시간도 로컬에 추가
      const remainingTime = calculateRemainingTime(expirationTime);
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    const logoutHandler = useCallback(() =>{ 
      setToken(null)
      localStorage.removeItem('USER_TOKEN'); //로컬에 삭제
      localStorage.removeItem("EXPIRATION_TIME");
      if(logoutTimer) clearTimeout(logoutHandler);
    },[]);

    useEffect(()=>{
      if(tokenData){
        logoutTimer = setTimeout(logoutHandler,tokenData.duration)
      }
    },[tokenData,logoutHandler]);

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