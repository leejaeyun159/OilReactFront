import styled from './Register.module.css';
import LinearProgress from "@mui/material/LinearProgress";
import { useRef, useState } from 'react';
import { TextField, Button} from '../UI';
import {text} from '../API/privacy'

const PWVAILD = /(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[a-zA-ZS]).{6,}/; //비밀번호 유효성 검사

const toJson = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    response.json().then((data) => {
      let errorMessage = "잘못된 접근입니다.";
      throw new Error(errorMessage);
    });
  }
};

const Register =()=>{
  const [isEqual, setIsEqual] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef();
  const nickRef = useRef();
  const passwordInputRef = useRef();
  const passwordInputConfirmRef = useRef();
  
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

  const submitHandler = e => {
     e.preventDefault();
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      const enteredNick = nickRef.current.value;
     
     setIsLoading(true);
     fetch(
       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvS0xnX5DZ5q5YAvwO5J0kxnqGNRSJ8zk",
       {
         method: "POST",
         body: JSON.stringify({
           email: enteredEmail,
           password: enteredPassword,
           returnSecureToken: true,
           nickName: enteredNick,
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
         alert('환영합니다!');
       })
       .catch((err) => {
         alert(err.message);
       })
       .finally(() => {
         setIsLoading(false);
       });
   };

    return (
      <div className={styled.div}>
        <form onSubmit={submitHandler}>
          <h2>회원가입</h2>
          <h3>아이디(이메일 인증)</h3>
          <p>이메일 형식으로 입력해주세요</p>
          <span>
            <TextField place="아이디" type="email" inputRef={emailInputRef} />
            <Button type="submit" child="인증번호 전송" padding="5" />
          </span>
          <span>
            <TextField place="인증번호" type="text" />
            <Button type="submit" child="인증번호 확인" padding="5" />
          </span>
          <h3>닉네임</h3>
          <TextField place="닉네임" type="text" inputRef={nickRef}/>
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
          <Button type="submit" child="약관 동의 및 회원가입" padding="10" />
          {isLoading && <LinearProgress sx={{ mb: 2 }} />}
        </form>
      </div>
    );
}

export default Register;