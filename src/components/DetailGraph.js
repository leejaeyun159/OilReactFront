import styled from "./DetailGraph.module.css";
import { useCallback, useEffect, useState } from "react";
import { ProgressBar, Card, Wave, DiaryPage, Highlight } from "../UI/";
import { Link, useSearchParams } from 'react-router-dom';
import { Accordion } from "../MUI";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CreateIcon from "@mui/icons-material/Create";
import moment from "moment/moment";

let DIARYCONTENT = {
  title: '',
  days: '',
  weather: '',
  mmdd: '',
  highlights: '',
  sentences: '',
  CoditionPer: {
    R: 0,
    G: 0,
    B: 0,
  },
};
let highlights = '';
const DetailGraph = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [URLSTRING] = useSearchParams();
  const code = URLSTRING.get("postId");

  const GetHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://oil-logintest-default-rtdb.firebaseio.com/mockup/" + code + ".json"
      );
      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      console.log(data)
      const days = new Date(data.diary.content.timeStamp);

      DIARYCONTENT.title = data.diary.content.title;
      DIARYCONTENT.days = moment(days).format("YYYYMMDD A");
      DIARYCONTENT.weather = data.diary.content.weather + " Weather";
      DIARYCONTENT.mmdd = moment(days).format("MMDD");
      DIARYCONTENT.highlights = data.diary.highlights;
      DIARYCONTENT.sentences = data.diary.content.sentences;
      DIARYCONTENT.CoditionPer.R = data.document.confidence.negative;
      DIARYCONTENT.CoditionPer.G = data.document.confidence.neutral;
      DIARYCONTENT.CoditionPer.B = data.document.confidence.positive;

      if (DIARYCONTENT.highlights.length > 16) {
        highlights = DIARYCONTENT.highlights.substring(0,36) + "..";
      } else {
        highlights = DIARYCONTENT.highlights;
      } //문자열 자르기

      console.log(DIARYCONTENT['highlights']);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [code]);

  useEffect(() => {
    GetHandler();
  }, [GetHandler]);

    return (
      <div className={styled.div}>
        {!isLoading && (
          <div className="ConditionBox">
            <DiaryPage
              title={DIARYCONTENT["title"]}
              days={DIARYCONTENT["days"]}
              weather={DIARYCONTENT["weather"]}
              mmdd={DIARYCONTENT["mmdd"]}
              preview={DIARYCONTENT.CoditionPer}
            ></DiaryPage>
            <Wave color={DIARYCONTENT.CoditionPer} />
            <h3>부 정</h3>
            <p>
              우리는 남의 기쁨에서 우리 자신의 슬픔을 뽑아오고 남의 슬픔에서
              기쁨을 얻어온다
            </p>
            <Card maxWidth="600">
              <span className={styled.span}>
                <h4>부정적</h4>
                <div>
                  <ProgressBar
                    color={"#DB9791"}
                    persent={DIARYCONTENT.CoditionPer["R"].toFixed(1)}
                  />
                </div>
                <h4>{DIARYCONTENT.CoditionPer["R"].toFixed(1)}%</h4>
              </span>
              <span className={styled.span}>
                <h4>모호한</h4>
                <div>
                  <ProgressBar
                    color={"#CADB69"}
                    persent={DIARYCONTENT.CoditionPer["G"].toFixed(1)}
                  />
                </div>
                <h4>{DIARYCONTENT.CoditionPer["G"].toFixed(1)}%</h4>
              </span>
              <span className={styled.span}>
                <h4>긍정적</h4>
                <div>
                  <ProgressBar
                    color={"#80ABDB"}
                    persent={DIARYCONTENT.CoditionPer["B"].toFixed(1)}
                  />
                </div>
                <h4>{DIARYCONTENT.CoditionPer["B"].toFixed(1)}%</h4>
              </span>
              <Accordion
                children={
                  <span className={styled.contentTitle}>
                    <Highlight text={`${highlights}`} />
                    <button>
                      <CreateIcon color="primary" sx={{
                        '&:hover': {
                          color: 'red', 
                          cursor: 'pointer'
                        }}}/>
                    </button>
                    <button>
                      <DeleteSweepIcon color="primary" sx={{
                        '&:hover': {
                          color: 'red', 
                          cursor: 'pointer'
                        }}} />
                    </button>
                  </span>
                }
                open={true}
                context={<span>{DIARYCONTENT.sentences}</span>}
              />
            </Card>
          </div>
        )}
        <p>* 일기는 익일 새벽 4시를 기준으로 수정이 불가합니다</p>
      </div>
    );};

export default DetailGraph;
