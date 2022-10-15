import styled from './FindPassword.module.css'
import {TextField,Button } from '../UI'
import {Link} from 'react-router-dom';
import { useState, useRef } from 'react';
import usePassWordFind from '../Hooks/use-pwfind';

const PWVAILD = /(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[a-zA-ZS]).{6,}/; //비밀번호 유효성 검사

const FindPassword =()=>{
  const [isValid, setIsValid] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const emailInputRef = useRef(); 
  const emailConfirmRef = useRef();
  const passwordInputRef = useRef();
  const passwordInputConfirmRef = useRef();

  const {
    sendRequest:sendFn,
    isResponse: sendRes
  } = usePassWordFind();

  const {
    sendRequest:chagePwFn,
    isResponse:chageRes
  } = usePassWordFind();

  const passwordFormatValid =()=>{
    if(PWVAILD.test(passwordInputRef.current.value))
      { setIsValid(true); }
    else setIsValid(false);
  } //비밀번호 유효성 검사
  const passwordEqual = () =>{
    if(passwordInputRef.current.value !== ""
      &&(passwordInputRef.current.value === passwordInputConfirmRef.current.value))
      { setIsEqual(true); }
    else setIsEqual(false);
  } //비밀번호 확인 검사

  const submitEmailHandler = (e) =>{
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const requestConfig = {
      email: enteredEmail,
      requestType: "PASSWORD_RESET",
      url: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=",
    };
    sendFn(requestConfig, "send");
    console.log("최종 결과" + sendRes);
  }

  const submitHandler =(e) =>{
    e.preventDefault();
    const enterNewPassword = passwordInputRef.current.value;
    const requestConfig = {
      oobCode: "",
      newPassword: enterNewPassword,
      url: "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=",
    };
    chagePwFn(requestConfig,"change");
    console.log('변경결과' + chageRes);
  }

    return (
      <div  className={styled.FindPWBox}>
        <h2>비밀번호 찾기/변경</h2>
        <h3>이메일 인증</h3>
        <div>
          <TextField
            place="이메일을 입력하세요"
            type="email"
            inputRef={emailInputRef}
          />
          <Button
            type="submit"
            child="인증메일 발송"
            padding="5"
            onClick={submitEmailHandler}
          />
        </div>
        <div>
          <TextField
            place="인증번호 입력"
            type="text"
            inputRef={emailConfirmRef}
          />
          <Button
            type="submit"
            child="인증번호 확인"
            padding="5"
            // onClick={submitCofirmCodeHandler}
          />
        </div>
        <h3>비밀번호 변경</h3>
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
          <p>비밀번호 일치{isEqual ? "✅" : "⬜"}</p>
        </span>
        <Link to="/login">
          <Button type="submit" child="비밀번호 변경" padding="10" onClick={submitHandler} />
        </Link>
      </div>
    );
}

export default FindPassword;