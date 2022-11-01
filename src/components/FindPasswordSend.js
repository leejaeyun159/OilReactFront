import styled from "./FindPassword.module.css";
import { TextField, Button } from "../UI";
import { useRef, useState, useContext } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import usePost from "../Hooks/use-post";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/oil-context";

const VALIDCHECK = {
  EMAILVALID: /\w+@\w+\.\w+(\.\w+)?/,
}; //정규식 모음

const FindPasswordSend = () => {
  const [isEmformat, setIsEmformat] = useState(false);
  const emailInputRef = useRef();
  const CodeInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const EmailFormatValid = () => {
    localStorage.removeItem("EMAIL");
    localStorage.removeItem("AUTHCODE");
    if (VALIDCHECK.EMAILVALID.test(emailInputRef.current.value)) {
      setIsEmformat(true);
    } else setIsEmformat(false);
  }; //이메일 번호 유효성 검사

  const {
    sendRequest: emailreqBody,
    isResponse: emailRes,
    isLoading,
  } = usePost(); //이메일 전송 hook(POST)

  const submitEmailHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    localStorage.setItem("EMAIL", enteredEmail);
    const requestBody = {
      email: enteredEmail,
      type: "password",
      url: "http://18.181.249.83:8080/api/auth/email-key",
    };
    emailreqBody(requestBody, "emailSend");
  };

  const AuthCodeConfirmHandler = (e) => {
    e.preventDefault();
    const AuthCode = localStorage.getItem("AUTHCODE");
    const enteredAuthcode = CodeInputRef.current.value;
    if (AuthCode === enteredAuthcode && isEmformat) {
      Swal.fire({
        title: "인증성공",
        text: "새로운 비밀번호를 설정해주세요",
        icon: "success",
        confirmButtonColor: "#002560",
        confirmButtonText: "확인",
      });
      isLoggedIn
        ? navigate("/authChangePw", { replace: true })
        : navigate("/changePw", { replace: true });
      localStorage.removeItem("AUTHCODE");
    } else {
      Swal.fire({
        title: "인증실패",
        text: "인증번호 재전송을 통해 다시 시도해주세요",
        icon: "warning",
        confirmButtonColor: "red",
        confirmButtonText: "확인",
      });
      localStorage.removeItem("AUTHCODE");
      localStorage.removeItem("EMAIL");
    }
  };

  return (
    <div className={styled.FindPWBox}>
      <span>
        <h2>비밀번호 찾기/변경</h2>
        <h4>인증메일 전송</h4>
      </span>
      <h3>이메일 인증</h3>
      {!isLoading && <p>*유효한 이메일로 작성해주세요</p>}
      {isLoading && <LinearProgress sx={{ m: 2 }} />}
      <form>
        <TextField
          place="이메일을 입력하세요"
          type="email"
          inputRef={emailInputRef}
          onChange={EmailFormatValid}
        />
        <Button
          type="submit"
          child="인증메일 발송"
          padding="5"
          onClick={submitEmailHandler}
          bgcolor={!isEmformat ? "grey" : ""}
          disabled={!isEmformat}
        />
      </form>
      {emailRes && (
        <form>
          <TextField
            place="인증번호 6자리"
            type="text"
            inputRef={CodeInputRef}
          />
          <Button
            type="submit"
            child="인증번호확인"
            padding="5"
            onClick={AuthCodeConfirmHandler}
          />
        </form>
      )}
    </div>
  );
};

export default FindPasswordSend;
