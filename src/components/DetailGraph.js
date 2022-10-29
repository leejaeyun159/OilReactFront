import styled from "./DetailGraph.module.css";
import { useCallback, useEffect, useState } from "react";
import { ProgressBar, Card, Wave, DiaryPage, Highlight, Clock } from "../UI/";
import { Link, useSearchParams } from 'react-router-dom';
import { saying } from '../API/optionData';
import { Accordion } from "../MUI";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CreateIcon from "@mui/icons-material/Create";
import moment from "moment/moment";
import Swal from 'sweetalert2';

let DIARYCONTENT = {
  title: '',
  days: '',
  weather: '',
  mmdd: '',
  highlights: '',
  sentences: '',
  sentiment:'',
  saying:'',
  CoditionPer: {
    R: 0,
    G: 0,
    B: 0,
  },
};
let highlights = '';
let days;
const DetailGraph = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [URLSTRING] = useSearchParams();
  const code = URLSTRING.get("postId");
  const rd = Math.floor(Math.random()*9);

  const GetHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://oil-logintest-default-rtdb.firebaseio.com/mockup/" + code + ".json"
      );
      if (!response.ok) throw new Error("Something went wrong!");

      const data = await response.json();
      console.log(data)
      days = new Date(data.diary.content.timeStamp);
      DIARYCONTENT.title = data.diary.content.title;
      DIARYCONTENT.days = moment(days).format("YYYYMMDD A");
      DIARYCONTENT.weather = data.diary.content.weather + " Weather";
      DIARYCONTENT.mmdd = moment(days).format("MMDD");
      DIARYCONTENT.highlights = data.diary.highlights;
      DIARYCONTENT.sentences = data.diary.content.sentences;
      DIARYCONTENT.sentiment = data.document.sentiment==="positive"?"긍 정"
      :(data.document.sentiment==="negative"?"부 정":"평 범");
      DIARYCONTENT.CoditionPer.R = data.document.confidence.negative;
      DIARYCONTENT.CoditionPer.G = data.document.confidence.neutral;
      DIARYCONTENT.CoditionPer.B = data.document.confidence.positive;
      DIARYCONTENT.saying = saying[data.document.sentiment][rd];
      if (DIARYCONTENT.highlights.length > 16) {
        highlights = DIARYCONTENT.highlights.substring(0,36) + "..";
      } else {
        highlights = DIARYCONTENT.highlights;
      } //문자열 자르기
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
            <h3>{DIARYCONTENT.sentiment}</h3>
            <p>{DIARYCONTENT.saying.Title}</p>
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
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "게시물 수정",
                          text: "게시물을 수정하시겠습니까?",
                          icon: "question",
                          showCancelButton: true,
                          confirmButtonColor: "grey",
                          cancelButtonColor: "#002560",
                          confirmButtonText: "수정",
                          cancelButtonText: "취소",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "만료된 기간",
                              text: "작성일자 기준 익일 새벽 4시까지만 수정하실 수 있습니다",
                              icon: "error",
                              confirmButtonColor: "#002560",
                              confirmButtonText: "확인",
                            });
                          }
                        });
                      }}
                    >
                      <CreateIcon
                        color="primary"
                        sx={{
                          "&:hover": {
                            color: "red",
                            cursor: "pointer",
                          },
                        }}
                      />
                    </button>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "게시물 삭제",
                          text: "게시물을 정말로 삭제할까요?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#002560",
                          confirmButtonText: "삭제",
                          cancelButtonText: "취소",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "게시물 삭제",
                              text: "게시물이 삭제되었습니다",
                              icon: "success",
                              confirmButtonColor: "#002560",
                              confirmButtonText: "확인",
                            });
                          }
                        });
                      }}
                    >
                      <DeleteSweepIcon
                        color="primary"
                        sx={{
                          "&:hover": {
                            color: "red",
                            cursor: "pointer",
                          },
                        }}
                      />
                    </button>
                  </span>
                }
                open={true}
                context={<span>{DIARYCONTENT.sentences}</span>}
              />
            </Card>
          </div>
        )}
        {/* <Clock timeStamp = {days}/> */}
        <p>* 일기는 익일 새벽 4시를 기준으로 수정이 불가합니다</p>
      </div>
    );};

export default DetailGraph;
