import styled from './Login.module.css';
import LinearProgress from "@mui/material/LinearProgress";
import { TextField, Button, Card } from "../UI";
import { Link } from "react-router-dom";
import { useRef, useState, useContext } from 'react';
import OilContext from '../store/oil-context';

const toJson = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((data) => {
      let errorMessage = "잘못된 접근입니다";
      throw new Error(errorMessage);
    });
  }
};

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);

    const emailInputRef = useRef();
    const passwordRef = useRef();
    const authCtx = useContext(OilContext);
    
    const submitHandler = e =>{
      e.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordRef.current.value;
    

    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvS0xnX5DZ5q5YAvwO5J0kxnqGNRSJ8zk",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
        setIsLoading(true);
        return response;
      })
      .then(toJson)
      .then((data) => {
        alert('로그인 되었습니다')
        authCtx.login(data.idToken);
        console.log(authCtx.token)
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={styled.div}>
      <img src="/asset/BigLogo.png" alt="mainLogo" />
      <form onSubmit={submitHandler}>
        <TextField place="이메일을 입력하세요" type="email" inputRef={emailInputRef}/>
        <TextField place="⦁⦁⦁⦁⦁⦁⦁⦁" type="password" inputRef={passwordRef} />
        <Button type="submit" child="로그인" padding="10" />
        {isLoading && <LinearProgress sx={{ mb: 2 }} />}
      </form>
      <Card>
        <Link to="/findPW">비밀번호 찾기</Link>
        <Link to="/register">회원가입</Link>
      </Card>
    </div>
  );
};

export default Login;
