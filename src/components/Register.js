import styled from './Register.module.css';
import LinearProgress from "@mui/material/LinearProgress";
import { useRef, useState } from 'react';
import { TextField, Button } from '../UI';
import {text} from '../API/privacy'
import usePost from "../Hooks/use-post";
import usePut from "../Hooks/use-put";
import { useNavigate } from 'react-router-dom';

const VALIDCHECK = {
  EMAILVALID: /\w+@\w+\.\w+(\.\w+)?/,
  PWVAILD: /(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[a-zA-ZS]).{6,}/,
}; //정규식 모음

const Register =()=>{
  const [isEmfomat, setIsEmformat] = useState(false);
  const [isEqual, setIsEqual] = useState(false)
  const [isValid, setIsValid] = useState(false)
  
  const emailInputRef = useRef();
  const nickRef = useRef();
  const CodeInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordInputConfirmRef = useRef();

  const navigate = useNavigate();
  
  const lastButton = isEqual && isValid;

  const {
    sendRequest: emailreqBody,
    isResponse: emailRes //인증코드창 활성화 
  } = usePost(); //이메일 전송 hook(POST)

  const {
    sendRequest: registerBody,
    isResponse: registerRes,
    isLoading
  } = usePost(); //회원가입 전송 hook(POST)
  
  const {
    sendRequest: authCodeBody,
    isResponse: authcoderes
  } = usePut(); //수정예정

  const EmailFormatValid =()=>{
    if(VALIDCHECK.EMAILVALID.test(emailInputRef.current.value)){
      setIsEmformat(true);
    }else setIsEmformat(false);
  }//이메일 번호 유효성 검사

  const passwordFormatValid =()=>{
    if (VALIDCHECK.PWVAILD.test(passwordInputRef.current.value)) {
      setIsValid(true);
    } else setIsValid(false);
  } //비밀번호 유효성 검사

  const passwordEqual = () =>{
    if(passwordInputRef.current.value !== ""
      &&(passwordInputRef.current.value === passwordInputConfirmRef.current.value))
      { setIsEqual(true); }
    else setIsEqual(false);
  } //비밀번호 확인 검사

  const EmailSubmitHandler = e =>{
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const requestBody = {
      email: enteredEmail,
      url: "http://18.181.249.83:8080/api/auth/email-key"
    };
    emailreqBody(requestBody,'emailSend'); //이메일 전송
  }

  const AuthCodeConfirmHandler = e =>{
    e.preventDefault();
    const enteredAuthCode = CodeInputRef.current.value;
    const requestBody = {
      key: enteredAuthCode,
      url: "http://18.181.249.83:8080/api/auth/check/email-key"
    };
    authCodeBody(requestBody,"authCodeConSend"); //회원가입 전송
  }

  const submitHandler = e => {
     e.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredNick = nickRef.current.value;
     const requestBody = {
       email: enteredEmail,
       password: enteredPassword,
       nickname: enteredNick,
       url: "http://18.181.249.83:8080/api/auth/register",
     };
     registerBody(requestBody, 'register');
     console.log("결과" + registerRes.success);
     navigate('/login',{replace:true});
   };

    return (
      <div className={styled.formRegister}>
        <h2>회원가입</h2>
        <h3>아이디(이메일 인증)</h3>
        <p>이메일 형식으로 입력해주세요</p>
        <form>
          <TextField
            place="아이디"
            type="email"
            inputRef={emailInputRef}
            onChange={EmailFormatValid}
          />
          {isEmfomat && (
            <Button
              type="submit"
              child="인증번호전송"
              padding="5"
              onClick={EmailSubmitHandler}
            />
          )}
          {!isEmfomat && (
            <Button
              type="submit"
              child="인증번호전송"
              padding="5"
              bgcolor="grey"
              disabled={true}
            />
          )}
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
          <p>비밀번호 일치{isEqual ? "✅" : "⬜"}</p>
        </span>
        <h3>개인정보 취급방침 동의</h3>
        <div id="privacy">{text}</div>
        {lastButton && (
          <Button
            type="submit"
            child="약관 동의 및 회원가입"
            padding="10"
            onClick={submitHandler}
          />
        )}
        {!lastButton && (
          <Button
            type="submit"
            child="약관 동의 및 테스트"
            padding="10"
            onClick={submitHandler}
            bgcolor="grey"
            disabled={true}
          />
        )}
        {isLoading && <LinearProgress sx={{ mb: 2 }} />}
      </div>
    );
}

export default Register;