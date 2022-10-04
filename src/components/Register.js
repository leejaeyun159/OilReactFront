import styled from './Register.module.css';
import { Card, TextField, Button} from '../UI';
import {text} from '../API/privacy'
import {Link} from 'react-router-dom';

const Register =()=>{
    return (
      <div className={styled.div}>
        <Card mxWidth="350">
          <h3>회원가입</h3>
          <p>아이디(이메일 인증)</p>
          <span>
            <TextField place="아이디" type="text" />
            <Button type="submit" child="인증번호 전송" padding="5" />
          </span>
          <span>
            <TextField place="인증번호" type="text" />
            <Button type="submit" child="인증번호 확인" padding="5" />
          </span>
          <p>닉네임</p>
          <TextField type="text" />
          <p>비밀번호</p>
          <TextField place="비밀번호" type="text" />
          <TextField place="비밀번호 확인" type="text" />
          <p>개인정보 취급방침 동의</p>
          <div id="privacy">{text}</div>
          <Link to="/login">
            <Button type="submit" child="약관 동의 및 회원가입" padding="10" />
          </Link>
        </Card>
      </div>
    );
}

export default Register;