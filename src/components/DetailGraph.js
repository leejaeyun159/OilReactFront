import styled from "./DetailGraph.module.css";
import {ProgressBar, Card, Wave, DiaryPage, Highlight} from "../UI/";

const CoditionPer = {
  R: 100,
  G: 100,
  B: 50
};

const DiaryConent = {
  main: '몰랐던 좋은 포맨 노래를 발견했다',
  days:'20220519 AM',
  weather:'Cloudy Weather',
  mmdd:'0519'
};

const DetailGraph = () => {
    return (
      <div className={styled.div}>
        <div className="ConditionBox">
          <DiaryPage
            main={DiaryConent["main"]}
            days={DiaryConent["days"]}
            weather={DiaryConent["weather"]}
            mmdd={DiaryConent["mmdd"]}
          ></DiaryPage>
          <Wave color={CoditionPer} />
          <h3>부 정</h3>
          <p>
            우리는 남의 기쁨에서 우리 자신의 슬픔을 뽑아오고 남의 슬픔에서 기쁨을 얻어온다
          </p>
          <Card maxWidth="600">
            <span className={styled.span}>
              <h4>부 정</h4>
              <ProgressBar
                color={"#007bb1"}
                persent={CoditionPer["R"].toFixed(1)}
              />
              <h4>{CoditionPer["R"].toFixed(1)}%</h4>
            </span>
            <span className={styled.span}>
              <h4>중 립</h4>
              <ProgressBar
                color={"#b1b1b1"}
                persent={CoditionPer["G"].toFixed(1)}
              />
              <h4>{CoditionPer["G"].toFixed(1)}%</h4>
            </span>
            <span className={styled.span}>
              <h4>긍 정</h4>
              <ProgressBar
                color={"#1c7202"}
                persent={CoditionPer["B"].toFixed(1)}
              />
              <h4>{CoditionPer["B"].toFixed(1)}%</h4>
            </span>
            <Highlight text="오늘따라 갑자기 니 생각이 나니까" />
          </Card>
        </div>
      </div>
    );};

export default DetailGraph;
