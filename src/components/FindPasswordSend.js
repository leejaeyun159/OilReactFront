import styled from './FindPassword.module.css'
import {TextField,Button } from '../UI'
import { useRef, useState } from 'react';
import usePassWordFind from '../Hooks/use-pwfind';
import LinearProgress from "@mui/material/LinearProgress";

const FindPasswordSend =()=>{
  
  const emailInputRef = useRef(); 

  const {
    sendRequest:sendFn,
    isResponse: sendRes,
    isLoading
  } = usePassWordFind();


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

    return (
      <form className={styled.FindPWBox} onSubmit={submitEmailHandler}>
        <h2>비밀번호 찾기/변경</h2>
        <h3>이메일 인증</h3>
        <TextField
          place="이메일을 입력하세요"
          type="email"
          inputRef={emailInputRef}
        />
          <p>*유효한 이메일로 작성해주세요</p>
        <Button type="submit" child="인증메일 발송" padding="5" />
        {isLoading && <LinearProgress sx={{ mb: 2 }} />}
      </form>
    );
}

export default FindPasswordSend;