import styles from "./DetailGraph.module.css";
import {ProgressBar, Card, Wave, Nav, DiaryPage, Highlight} from "../UI/";
import TextField from '../UI/TextField';
import Button from "../UI/Button";

const CoditionPer = {
  R: 100,
  G: 100,
  B: 100
};
const DiaryConent = {
  main: '몰랐던 좋은 포맨 노래를 발견했다',
  days:'20220519 AM',
  weather:'Cloudy Weather',
  mmdd:'0927'
}

const DetailGraph = () => {
    return (
      <div className={styles.div}>
        <Nav pageTitle="감정 상세보기" />
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
            우리는 남의 기쁨에서 우리 자신의 슬픔을 뽑아오고
            <br /> 남의 슬픔에서 기쁨을 얻어온다
          </p>
          <Card>
            <Highlight text="오늘따라 갑자기 니 생각이 나니까" />
            <ProgressBar
              color={"#AAC4FF"}
              persent={CoditionPer["R"].toFixed(1) * 0.9}
            >
              NEGATIVE {CoditionPer["R"].toFixed(1)}
            </ProgressBar>

            <ProgressBar
              color={"#D2DAFF"}
              persent={CoditionPer["G"].toFixed(1) * 0.9}
            >
              SOSO {CoditionPer["G"].toFixed(1)}
            </ProgressBar>

            <ProgressBar
              color={"#EEF5FF"}
              persent={CoditionPer["B"].toFixed(1) * 0.9}
            >
              POSITIVE {CoditionPer["B"].toFixed(1)}
            </ProgressBar>
          </Card>
          <h4>피드로 돌아가기</h4>
        </div>
        <TextField place="이메일을 입력하세요" type="text" />
        <br />
        <TextField place="⦁⦁⦁⦁⦁⦁⦁⦁" type="password" />
        <br/>
        <Button type="submit" child="로그인" padding="13"/>
      </div>
    );};

export default DetailGraph;
