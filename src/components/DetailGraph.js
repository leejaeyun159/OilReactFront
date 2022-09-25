import styles from "./DetailGraph.module.css";
import {ProgressBar,Card,Wave,Nav} from "../UI/";

const CoditionPer = {
  R: 81,
  G: 2,
  B: 17
};

const DetailGraph = () => {
    return (
      <div className={styles.div}>
        <Nav pageTitle="감정 상세보기"/>
        <div className="ConditionBox">
          <Card>
            <label>NEGATIVE {CoditionPer["R"].toFixed(1)}%</label>
            <ProgressBar
              color={"#f13e3eb5"}
              persent={CoditionPer["R"].toFixed(1) * 0.9}
            />

            <label>DEFAULT {CoditionPer["G"].toFixed(1)}%</label>
            <ProgressBar
              color={"#40a1469e"}
              persent={CoditionPer["G"].toFixed(1) * 0.9}
            />

            <label>POSITIVE {CoditionPer["B"].toFixed(1)} %</label>
            <ProgressBar
              color={"#1649cb9e"}
              persent={CoditionPer["B"].toFixed(1) * 0.9}
            />
          </Card>
          <Wave color={CoditionPer} />
          <h3>슬 픔</h3>
          <p>
            “우리는 남의 기쁨에서 우리 자신의 슬픔을 뽑아오고
            <br /> 남의 슬픔에서 기쁨을 얻어온다”
          </p>
        </div>
      </div>
    );
};

export default DetailGraph;
