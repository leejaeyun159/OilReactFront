import styled from './FindPassword.module.css'
import {TextField,Button } from '../UI'
import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePassWordFind from '../Hooks/use-pwfind';
import LinearProgress from "@mui/material/LinearProgress";

const PWVAILD = /(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[a-zA-ZS]).{6,}/; //비밀번호 유효성 검사

const FindPassword =()=>{
  const [isValid, setIsValid] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
  const passwordInputRef = useRef();
  const passwordInputConfirmRef = useRef();
  const lastButton = isValid && isEqual;

  const [AuthCode] = useSearchParams();
  const code = AuthCode.get('oobCode');

  const {
    sendRequest:chagePwFn,
    isResponse:chageRes,
    isLoading
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

  const submitHandler =(e) =>{
    e.preventDefault();
    const enterNewPassword = passwordInputRef.current.value;
    const requestConfig = {
      oobCode: code,
      newPassword: enterNewPassword,
      url: "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=",
    };
    chagePwFn(requestConfig,"change");
    console.log('변경결과' + chageRes);
  }

    return (
      <div className={styled.FindPWBox}>
        <h2>비밀번호 찾기/변경</h2>
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
          <p>비밀번호 일치{isEqual ? "✅" : "⬜"}</p>
        </span>
        {lastButton&&<Button type="submit" child="비밀번호 변경" padding="10" onClick={submitHandler}/>}
        {!lastButton&&<Button type="submit" child="비밀번호 변경" padding="10" bgcolor="grey" disabled={true}/>}
        {isLoading && <LinearProgress sx={{ mb: 2 }} />}
      </div>
    );
}

export default FindPassword;