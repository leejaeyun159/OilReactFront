import styled from './FindPassword.module.css'
import {TextField,Button } from '../UI'
import { useRef } from 'react';
import usePassWordFind from '../Hooks/use-pwfind';

const FindPasswordSend =()=>{
  const emailInputRef = useRef(); 

  const {
    sendRequest:sendFn,
    isResponse: sendRes
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
      <div  className={styled.FindPWBox}>
        <h2>비밀번호 찾기/변경</h2>
        <h3>이메일 인증</h3>
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
    );
}

export default FindPasswordSend;