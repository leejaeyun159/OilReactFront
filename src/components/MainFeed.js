import styled from './MainFeed.module.css'; 
import { FloatingActionButtons, BasicModal, Reloading, LoadingSkeleton } from '../MUI';
import CreatePage from './CreatePage';
import { DiaryPage } from '../UI';
import {useState, useCallback, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import AuthContext from "../store/oil-context";

let MAINFEED = [];
let FEEDKEY = [];

const MainFeed = ()=>{
  const [modalPaging, setModalPage] = useState(false); //모달창 상태
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(null);
  const authCtx = useContext(AuthContext);
  const TOKEN = authCtx.token;
  const getRequestPayload = {
    headers: {
      Authorization: "Bearer " + TOKEN,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const modalPageOpenHandler =()=> {
    setModalPage(true);
  } //모달창 키기
  const modalPageCloseHandler =()=> {
    setModalPage(false);
  } //모달창 끄기

  const GetHandler = useCallback(async ()=>{
    setIsLoading(true);
    setError(null);
    MAINFEED=[];
    FEEDKEY=[];

    try{
      const getFetch = await fetch("http://18.181.249.83:8080/api/main?page=0",{
      method: "GET",
      headers: getRequestPayload.headers,
      redirect: "follow",
      });

      const response = await getFetch.json();
      const result = response.data

      for(const key in result){
        let days = new Date(result[key].updatedAt);
        
        if(FEEDKEY.includes(key)) break;
        FEEDKEY.push(key); //중복된 key값이 있으면 안불러옴
        MAINFEED.push({
          id: result[key].id,
          title: result[key].title,
          days: moment(days).format("YYYYMMDD A"),
          weather: result[key].weather + " Weather",
          mmdd: moment(days).format("MMDD"),
          CoditionPer: {
            R: result[key].negative,
            G: result[key].neutral,
            B: result[key].positive,
          },
        });
      }
      console.log(MAINFEED)
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
          <CreatePage close={modalPageCloseHandler} onPost={GetHandler} />
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
        {isLoading && <LoadingSkeleton />}
        {isError && <h2>페이지를 불러올 수 없습니다</h2>}
        <div className={styled.btn}>
          <FloatingActionButtons onClick={modalPageOpenHandler} />
        </div>
      </div>
    );
}

export default MainFeed;
