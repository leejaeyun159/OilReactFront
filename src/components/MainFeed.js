import styled from './MainFeed.module.css'; 
import { FloatingActionButtons, BasicModal } from '../MUI';
import CreatePage from './CreatePage';
import { DiaryPage } from '../UI';
import {useState} from 'react'
import { Link } from 'react-router-dom'

const DiaryConent = {
  main: "몰랐던 좋은 포맨 노래를 발견했다",
  days: "20220519 AM",
  weather: "Cloudy Weather",
  mmdd: "0519",
  CoditionPer: {
  R: 100,
  G: 100,
  B: 50
  }
}; //목업

const MainFeed = (props)=>{
  const [modalPaging, setModalPage] = useState(false) //모달창 상태
  const modalPageOpenHandler =()=> {
    setModalPage(true);
  } //모달창 키기
  const modalPageCloseHandler =()=> {
    setModalPage(false);
  } //모달창 끄기

    return (
      <div className={styled.div}>
        <BasicModal open={modalPaging} close={modalPageCloseHandler}>
          <CreatePage />
        </BasicModal>
        <p>* 일기는 익일 새벽 4시를 기준으로 수정이 불가합니다</p>
        {/* 지울예정 */}
        <Link to="/diarydetail">
          <DiaryPage
            main={DiaryConent["main"]}
            days={DiaryConent["days"]}
            weather={DiaryConent["weather"]}
            mmdd={DiaryConent["mmdd"]}
            preview={DiaryConent.CoditionPer}
          ></DiaryPage>
        </Link>
        <Link to="/diarydetail">
          <DiaryPage
            main={DiaryConent["main"]}
            days={DiaryConent["days"]}
            weather={DiaryConent["weather"]}
            mmdd={DiaryConent["mmdd"]}
            preview={DiaryConent.CoditionPer}
          ></DiaryPage>
        </Link>
        <Link to="/diarydetail">
          <DiaryPage
            main={DiaryConent["main"]}
            days={DiaryConent["days"]}
            weather={DiaryConent["weather"]}
            mmdd={DiaryConent["mmdd"]}
            preview={DiaryConent.CoditionPer}
          ></DiaryPage>
        </Link>
        <Link to="/diarydetail">
          <DiaryPage
            main={DiaryConent["main"]}
            days={DiaryConent["days"]}
            weather={DiaryConent["weather"]}
            mmdd={DiaryConent["mmdd"]}
            preview={DiaryConent.CoditionPer}
          ></DiaryPage>
        </Link>
        <Link to="/diarydetail">
          <DiaryPage
            main={DiaryConent["main"]}
            days={DiaryConent["days"]}
            weather={DiaryConent["weather"]}
            mmdd={DiaryConent["mmdd"]}
            preview={DiaryConent.CoditionPer}
          ></DiaryPage>
        </Link>
        <Link to="/diarydetail">
          <DiaryPage
            main={DiaryConent["main"]}
            days={DiaryConent["days"]}
            weather={DiaryConent["weather"]}
            mmdd={DiaryConent["mmdd"]}
            preview={DiaryConent.CoditionPer}
          ></DiaryPage>
        </Link>
        <Link to="/diarydetail">
          <DiaryPage
            main={DiaryConent["main"]}
            days={DiaryConent["days"]}
            weather={DiaryConent["weather"]}
            mmdd={DiaryConent["mmdd"]}
            preview={DiaryConent.CoditionPer}
          ></DiaryPage>
        </Link>
        <Link to="/diarydetail">
          <DiaryPage
            main={DiaryConent["main"]}
            days={DiaryConent["days"]}
            weather={DiaryConent["weather"]}
            mmdd={DiaryConent["mmdd"]}
            preview={DiaryConent.CoditionPer}
          ></DiaryPage>
        </Link>
        {/* 지울예정 */}
        <div className={styled.btn}>
          <FloatingActionButtons onClick={modalPageOpenHandler} />
        </div>
      </div>
    );
}

export default MainFeed;
