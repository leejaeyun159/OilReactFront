import styled from './MainFeed.module.css'; 
import { FloatingActionButtons, BasicModal } from '../MUI';
import CreatePage from './CreatePage';
import { DiaryPage } from '../UI';
import {useState} from 'react'

const DiaryConent = {
  main: "몰랐던 좋은 포맨 노래를 발견했다",
  days: "20220519 AM",
  weather: "Cloudy Weather",
  mmdd: "0519",
}; //목업

const MainFeed = (props)=>{
  const [modalPaging, setModalPage] = useState(false) //모달창 상태
  const modalPageOpenHandler =()=> {
    setModalPage(true);
    props.fn();
  } //모달창 키기
  const modalPageCloseHandler =()=> {
    setModalPage(false);
    props.fn();
  } //모달창 끄기

    return (
      <div className={styled.div}>
        <BasicModal open={modalPaging} close={modalPageCloseHandler}>
          <CreatePage />
        </BasicModal>
        <p>* 일기는 익일 새벽 4시를 기준으로 수정이 불가합니다</p>
        {/* 지울예정 */}
        <DiaryPage //목업
          main={DiaryConent["main"]}
          days={DiaryConent["days"]}
          weather={DiaryConent["weather"]}
          mmdd={DiaryConent["mmdd"]}
        ></DiaryPage>
        <DiaryPage
          main={DiaryConent["main"]}
          days={DiaryConent["days"]}
          weather={DiaryConent["weather"]}
          mmdd={DiaryConent["mmdd"]}
        ></DiaryPage>
        <DiaryPage
          main={DiaryConent["main"]}
          days={DiaryConent["days"]}
          weather={DiaryConent["weather"]}
          mmdd={DiaryConent["mmdd"]}
        ></DiaryPage>{" "}
        <DiaryPage
          main={DiaryConent["main"]}
          days={DiaryConent["days"]}
          weather={DiaryConent["weather"]}
          mmdd={DiaryConent["mmdd"]}
        ></DiaryPage>{" "}
        <DiaryPage
          main={DiaryConent["main"]}
          days={DiaryConent["days"]}
          weather={DiaryConent["weather"]}
          mmdd={DiaryConent["mmdd"]}
        ></DiaryPage>
        {/* 지울예정 */}
        <div className={styled.btn}>
          <FloatingActionButtons onClick={modalPageOpenHandler} />
        </div>
      </div>
    );
}

export default MainFeed;
