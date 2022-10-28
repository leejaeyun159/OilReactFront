import styled from './MainFeed.module.css'; 
import { FloatingActionButtons, BasicModal, Reloading, LoadingSkeleton } from '../MUI';
import CreatePage from './CreatePage';
import { DiaryPage } from '../UI';
import {useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment';

let MAINFEED = [];
let FEEDKEY = [];

const MainFeed = ()=>{
  const [modalPaging, setModalPage] = useState(false); //모달창 상태
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const modalPageOpenHandler =()=> {
    setModalPage(true);
  } //모달창 키기
  const modalPageCloseHandler =()=> {
    setModalPage(false);
  } //모달창 끄기

  const GetHandler = useCallback(async ()=>{
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://oil-logintest-default-rtdb.firebaseio.com/mockup.json');
      if(!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();

      for(const key in data){
        let days = new Date(data[key].diary.content.timeStamp);

        if(FEEDKEY.includes(key)) break;
        FEEDKEY.push(key); //중복된 key값이 있으면 안불러옴
        MAINFEED.push({
          id: key,
          title: data[key].diary.content.title,
          days: moment(days).format("YYYYMMDD A"),
          weather: data[key].diary.content.weather + " Weather",
          mmdd: moment(days).format("MMDD"),
          CoditionPer: {
            R: data[key].document.confidence.negative,
            G: data[key].document.confidence.neutral,
            B: data[key].document.confidence.positive,
          }
        });
      }
    } catch(error){
    console.log(error);
    setError(error)
  }
  setIsLoading(false);
  },[]);

  useEffect(()=>{
    GetHandler();
    console.log('렌더링');
  },[GetHandler])

    return (
      <div className={styled.div}>
        <BasicModal open={modalPaging} close={modalPageCloseHandler}>
          <CreatePage />
        </BasicModal>
        <Reloading onClick={GetHandler}>갱신하기</Reloading>
        <p>* 일기는 익일 새벽 4시를 기준으로 수정이 불가합니다</p>
        {!isLoading && (
          <ul>
            {MAINFEED.map((feed) => (
              <li key={feed.id}>
                <Link to={"/diarydetail?postId=" + feed.id}>
                  <DiaryPage
                    key={feed.id}
                    title={feed.title}
                    days={feed.days}
                    weather={feed.weather}
                    mmdd={feed.mmdd}
                    preview={feed.CoditionPer}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isLoading && <LoadingSkeleton/>}
        {isError && <h2>페이지를 불러올 수 없습니다</h2>}
        <div className={styled.btn}>
          <FloatingActionButtons onClick={modalPageOpenHandler} />
        </div>
      </div>
    );
}

export default MainFeed;
