import { useNavigate } from "react-router-dom";
import { HOSTIP } from "../../API/privateText";
import { TextField, Button } from "../../UI";
import { useState, useRef } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import styled from "./FindPassword.module.css";
import usePut from "../../Hooks/use-put";

const PWVAILD = /(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[a-zA-ZS]).{6,}/; //비밀번호 유효성 검사

const FindPassword = () => {
  const [isValid, setIsValid] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const passwordInputRef = useRef();
  const passwordInputConfirmRef = useRef();
  const lastButton = isValid && isEqual;
  const navigate = useNavigate();

  const { sendRequest, isLoading } = usePut();

  const passwordFormatValid = () => {
    if (PWVAILD.test(passwordInputRef.current.value)) {
      setIsValid(true);
    } else setIsValid(false);
  }; //비밀번호 유효성 검사
  const passwordEqual = () => {
    if (
      passwordInputRef.current.value !== "" &&
      passwordInputRef.current.value === passwordInputConfirmRef.current.value
    ) {
      setIsEqual(true);
    } else setIsEqual(false);
  }; //비밀번호 확인 검사

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = localStorage.getItem("EMAIL");
    const enterNewPassword = passwordInputRef.current.value;
    const requestConfig = {
      email: enteredEmail,
      password: enterNewPassword,
      url: HOSTIP + "api/auth/password",
    };
    sendRequest(requestConfig, "passwordChange");
    localStorage.removeItem("EMAIL");
    navigate("/login", { replace: true });
  };

  return (
    <div className={styled.FindPWBox}>
      <span>
        <h2>비밀번호 찾기/변경</h2>
        <h4>비밀번호 초기화</h4>
      </span>
      <h3>새로운 비밀번호 설정</h3>
      <TextField
        place="새로운 비밀번호"
        type="password"
        onChange={passwordFormatValid}
        inputRef={passwordInputRef}
      />
      <TextField
        place="새로운 비밀번호 확인"
        type="password"
        onChange={passwordEqual}
        inputRef={passwordInputConfirmRef}
      />
      <span className={styled.pwSpan}>
        <p>비밀번호 유효 {isValid ? "✅" : "⬜"}</p>
        <p>비밀번호 일치 {isEqual ? "✅" : "⬜"}</p>
      </span>
      <Button
        type="submit"
        child="비밀번호 변경"
        padding="10"
        onClick={submitHandler}
        bgcolor={lastButton ? "" : "grey"}
        disabled={!lastButton}
      />
      {isLoading && <LinearProgress sx={{ m: 2 }} />}
    </div>
  );
};

export default FindPassword;
