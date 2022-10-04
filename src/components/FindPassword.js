import styled from './FindPassword.module.css'
import {Card,TextField,Button } from '../UI'
import {Link} from 'react-router-dom';

const FindPassword =()=>{
    return (
      <div className={styled.div}>
        <Card mxWidth="350">
          <h3>비밀번호 찾기</h3>
          <p>이메일 인증</p>
          <span>
            <TextField place="이메일을 입력하세요" type="text" />
            <Button type="submit" child="인증메일 발송" padding="5" />
          </span>
          <span>
            <TextField place="인증번호 입력" type="text" />
            <Button type="submit" child="인증메일 확인" padding="5" />
          </span>
          <p>비밀번호 변경</p>
          <TextField place="새로운 비밀번호" type="password" />
          <TextField place="새로운 비밀번호 확인" type="password" />
          <Link to="/login">
            <Button type="submit" child="비밀번호 변경" padding="10" />
          </Link>
        </Card>
      </div>
    );
}

export default FindPassword;