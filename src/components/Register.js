import styled from "./Register.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import { useRef, useState } from "react";
import { TextField, Button } from "../UI";
import { text } from "../API/privacy";
import usePost from "../Hooks/use-post";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VALIDCHECK = {
  EMAILVALID: /\w+@\w+\.\w+(\.\w+)?/,
  PWVAILD: /(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[a-zA-ZS]).{6,}/,
}; //정규식 모음

const Register = () => {
  const [isEmformat, setIsEmformat] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isAuthCode, setIsAuthCode] = useState(false);

  const emailInputRef = useRef();
  const nickRef = useRef();
  const CodeInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordInputConfirmRef = useRef();

  const lastButton = isEqual && isValid && isAuthCode;

  const {
    sendRequest: emailreqBody,
    isResponse: emailRes, //인증코드창 활성화
    isLoading: emailLoading,
  } = usePost(); //이메일 전송 hook(POST)

  const {
    sendRequest: registerBody,
    isResponse: registerRes,
    isLoading: registerLoading,
  } = usePost(); //회원가입 전송 hook(POST)

  const EmailFormatValid = () => {
    setIsAuthCode(false); //인증번호 받고 이메일 바꾸면 다시바꿈
    localStorage.removeItem("EMAIL");
    localStorage.removeItem("AUTHCODE");
    if (VALIDCHECK.EMAILVALID.test(emailInputRef.current.value)) {
      setIsEmformat(true);
    } else setIsEmformat(false);
  }; //이메일 번호 유효성 검사

  const passwordFormatValid = () => {
    if (VALIDCHECK.PWVAILD.test(passwordInputRef.current.value)) {
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

  const EmailSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const requestBody = {
      email: enteredEmail,
      type: "register",
      url: "http://54.64.27.138:8080/api/auth/email-key",
    };
    emailreqBody(requestBody, "emailSend"); //이메일 전송
  };

  const AuthCodeConfirmHandler = (e) => {
    e.preventDefault();
    const AuthCode = localStorage.getItem("AUTHCODE");
    const enteredAuthcode = CodeInputRef.current.value;
    if (AuthCode === enteredAuthcode) {
      setIsAuthCode(true);
      Swal.fire({
        title: "인증성공",
        text: "인증번호가 일치합니다",
        icon: "success",
        confirmButtonColor: "#002560",
        confirmButtonText: "확인",
      });
    } else {
      localStorage.removeItem("AUTHCODE");
      Swal.fire({
        title: "인증실패",
        text: "인증번호 재전송을 통해 다시 시도해주세요",
        icon: "warning",
        confirmButtonColor: "red",
        confirmButtonText: "확인",
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredNick = nickRef.current.value;
    const requestBody = {
      email: enteredEmail,
      password: enteredPassword,
      nickname: enteredNick,
      url: "http://54.64.27.138:8080/api/auth/register",
    };
    registerBody(requestBody, "register");
  };

  return (
    <div className={styled.formRegister}>
      <h2>회원가입</h2>
      <h3>아이디(이메일 인증)</h3>
      {!emailLoading && <p>이메일 형식으로 입력해주세요</p>}
      {emailLoading && <LinearProgress sx={{ m: 2 }} />}
      <form>
        <TextField
          place="아이디"
          type="email"
          inputRef={emailInputRef}
          onChange={EmailFormatValid}
        />
        <Button
          type="submit"
          child="인증번호전송"
          padding="5"
          onClick={EmailSubmitHandler}
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
      <h3>닉네임</h3>
      <TextField place="닉네임" type="text" inputRef={nickRef} />
      <h3>비밀번호</h3>
      <p>
        비밀번호 숫자, 문자, 특수문자 포함 6자리 이상 조합으로 입력해주세요{" "}
      </p>
      <TextField
        place="비밀번호"
        type="password"
        inputRef={passwordInputRef}
        onChange={passwordFormatValid}
      />
      <TextField
        place="비밀번호 확인"
        type="password"
        inputRef={passwordInputConfirmRef}
        onChange={passwordEqual}
      />
      <span className={styled.pwSpan}>
        <p>비밀번호 유효 {isValid ? "✅" : "⬜"}</p>
        <p>비밀번호 일치 {isEqual ? "✅" : "⬜"}</p>
      </span>
      <h3>개인정보 취급방침 동의</h3>
      <div id="privacy">{text}</div>
      <Button
        type="submit"
        child="약관 동의 및 회원가입"
        padding="10"
        onClick={submitHandler}
        bgcolor={lastButton ? "" : "grey"}
        disabled={!lastButton}
      />
      {registerLoading && <LinearProgress sx={{ mb: 2 }} />}
    </div>
  );
};

export default Register;
