import styled from "./DetailGraph.module.css";
import {ProgressBar, Card, Wave, DiaryPage, Highlight} from "../UI/";
import {Link} from 'react-router-dom';
import { Accordion } from "../MUI";

const DiaryCotent = {
  title: "몰랐던 좋은 포맨 노래를 발견했다",
  days: "20220519 AM",
  weather: "Cloudy Weather",
  mmdd: "0519",
  highlight: "오늘따라 갑자기 네 생각이 나니까",
  content:"네가 있던 곳 우리가 있던 곳 가끔 아무 생각 없이 걷다보면 널 마중나가곤해 아직 너야 아직도 너를 사랑해 따뜻하게 입고 문 꼭 잠그고 택시 탈 땐조심해야해 집에만 있지말고 영화도 좀 보고 잘 지내야해 오늘따라 갑자기 네 생각이 나니까 오늘따라 미치게 보고싶은 너니까",
  deadLine:"Fri May 20 2022 04:00: GMT+0900 (한국 표준시)",
  CoditionPer: {
    R: 100,
    G: 100,
    B: 50
  }
};

const DetailGraph = () => {
  const context = (
  <>
    <p>{DiaryCotent.content}</p>
    <Link className={styled.Link} to="/">수정하기</Link>
  </>
  )
    return (
      <div className={styled.div}>
        <div className="ConditionBox">
          <DiaryPage
            title={DiaryCotent["title"]}
            days={DiaryCotent["days"]}
            weather={DiaryCotent["weather"]}
            mmdd={DiaryCotent["mmdd"]}
            preview={DiaryCotent.CoditionPer}
          ></DiaryPage>
          <Wave color={DiaryCotent.CoditionPer} />
          <h3>부 정</h3>
          <p>
            우리는 남의 기쁨에서 우리 자신의 슬픔을 뽑아오고 남의 슬픔에서
            기쁨을 얻어온다
          </p>
          <Card maxWidth="600">
            <span className={styled.span}>
              <h4>부 정</h4>
              <div>
                <ProgressBar
                  color={"#007bb1"}
                  persent={DiaryCotent.CoditionPer["R"].toFixed(1)}
                />
              </div>
              <h4>{DiaryCotent.CoditionPer["R"].toFixed(1)}%</h4>
            </span>
            <span className={styled.span}>
              <h4>중 립</h4>
              <div>
                <ProgressBar
                  color={"#b1b1b1"}
                  persent={DiaryCotent.CoditionPer["G"].toFixed(1)}
                />
              </div>
              <h4>{DiaryCotent.CoditionPer["G"].toFixed(1)}%</h4>
            </span>
            <span className={styled.span}>
              <h4>긍 정</h4>
              <div>
                <ProgressBar
                  color={"#1c7202"}
                  persent={DiaryCotent.CoditionPer["B"].toFixed(1)}
                />
              </div>
              <h4>{DiaryCotent.CoditionPer["B"].toFixed(1)}%</h4>
            </span>
            <Accordion
              children={<Highlight text={`${DiaryCotent.highlight}`} />}
              context={context}
            />
          </Card>
        </div>
        <p>* 일기는 익일 새벽 4시를 기준으로 수정이 불가합니다</p>
      </div>
    );};

export default DetailGraph;
