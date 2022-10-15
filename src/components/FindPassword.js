import styled from './FindPassword.module.css'
import {TextField,Button } from '../UI'
import {Link} from 'react-router-dom';
import { useState, useRef } from 'react';

const PWVAILD = /(?=.*\d)(?=.*?[#?!@$%^&*-])(?=.*[a-zA-ZS]).{6,}/; //비밀번호 유효성 검사

const FindPassword =()=>{
  const [isValid, setIsValid] = useState(false);
  const [isEqual, setIsEqual] = useState(false);
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

    return (
      <div className={styled.div}>
        <form mxWidth="350">
          <h2>비밀번호 찾기</h2>
          <h3>이메일 인증</h3>
          <span>
            <TextField place="이메일을 입력하세요" type="email" />
            <Button type="submit" child="인증메일 발송" padding="5" />
          </span>
          <span>
            <TextField place="인증번호 입력" type="text" />
            <Button type="submit" child="인증메일 확인" padding="5" />
          </span>
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
            <Button type="submit" child="비밀번호 변경" padding="10" />
          </Link>
        </form>
      </div>
    );
}

export default FindPassword;