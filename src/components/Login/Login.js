import { TextField, Button, Card } from "../../UI";
import { HOSTIP } from "../../API/privateText";
import { Link } from "react-router-dom";
import { useRef } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import usePost from "../../Hooks/use-post";
import styled from "./Login.module.css";

const Login = () => {
  localStorage.clear();
  const emailInputRef = useRef();
  const passwordRef = useRef();

  const { sendRequest: loginBody, isloading } = usePost();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const requestBody = {
      email: enteredEmail,
      password: enteredPassword,
      url: HOSTIP + "api/auth/login",
    };
    loginBody(requestBody, "login");
  };

  return (
    <div className={styled.div}>
      <img src="/asset/BigLogo.png" alt="mainLogo" />
      <form onSubmit={loginSubmitHandler}>
        <TextField
          place="이메일을 입력하세요"
          type="email"
          inputRef={emailInputRef}
        />
        <TextField place="⦁⦁⦁⦁⦁⦁⦁⦁" type="password" inputRef={passwordRef} />
        <Button type="submit" child="로그인" padding="10" />
        {isloading && <LinearProgress sx={{ mb: 2 }} />}
      </form>
      <Card>
        <Link to="/findPW">비밀번호 찾기</Link>
        <Link to="/register">회원가입</Link>
      </Card>
    </div>
  );
};

export default Login;
