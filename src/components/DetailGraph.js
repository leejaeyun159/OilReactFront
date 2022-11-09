import styled from "./DetailGraph.module.css";
import { useCallback, useEffect, useState, useContext } from "react";
import { ProgressBar, Card, Wave, DiaryPage, Highlight } from "../UI/";
import { useSearchParams, useNavigate } from "react-router-dom";
import { saying } from "../API/optionData";
import { Accordion, BasicModal } from "../MUI";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CreateIcon from "@mui/icons-material/Create";
import Swal from "sweetalert2";
import AuthContext from "../store/oil-context";
import CreatePage from "./CreatePage";
import { HOSTIP } from "../API/privateText";

let DIARYCONTENT = {
  id: "",
  title: "",
  days: "",
  weather: "",
  mmdd: "",
  highlights: "",
  sentences: "",
  sentiment: "",
  saying: "",
  CoditionPer: {
    R: 0,
    G: 0,
    B: 0,
  },
};

let highlights;

const DetailGraph = () => {
  const [modalPaging, setModalPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [URLSTRING] = useSearchParams();
  const code = URLSTRING.get("postId");
  const rd = Math.floor(Math.random() * 9);
  const authCtx = useContext(AuthContext);
  const TOKEN = authCtx.token;
  const navigate = useNavigate();
  const getRequestPayload = {
    headers: {
      Authorization: "Bearer " + TOKEN,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const modalPageOpenHandler = () => {
    setModalPage(true);
  }; //모달창 키기
  const modalPageCloseHandler = () => {
    setModalPage(false);
  }; //모달창
  const GetHandler = useCallback(async () => {
    setIsLoading(true);
    highlights = "";
    try {
      const getFetch = await fetch(HOSTIP + "api/posts/" + code, {
        method: "GET",
        headers: getRequestPayload.headers,
        redirect: "follow",
      });
      const response = await getFetch.json();
      const result = response.data;
      DIARYCONTENT.id = result.id;
      DIARYCONTENT.title = result.title;
      DIARYCONTENT.days = result.yyyymmdd;
      DIARYCONTENT.weather = result.weather + " Weather";
      DIARYCONTENT.mmdd = result.yyyymmdd.slice(4, 9);
      DIARYCONTENT.highlights = result.highlight
        ? result.highlight
        : "오늘의 한마디가 없습니다";
      DIARYCONTENT.sentences = result.content;
      DIARYCONTENT.sentiment =
        result.sentiment === "positive"
          ? "긍 정"
          : result.sentiment === "negative"
          ? "부 정"
          : "평 범";
      DIARYCONTENT.CoditionPer.R = result.negative;
      DIARYCONTENT.CoditionPer.G = result.neutral;
      DIARYCONTENT.CoditionPer.B = result.positive;
      DIARYCONTENT.saying = saying[result.sentiment][rd];
      if (DIARYCONTENT.highlights.length > 16) {
        highlights = DIARYCONTENT.highlights.substring(0, 36) + "..";
      } else {
        highlights = DIARYCONTENT.highlights;
      } //문자열 자르기
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const DeleteHandler = useCallback(async () => {
    setIsLoading(true);
    highlights = "";
    try {
      const getFetch = await fetch(HOSTIP + "api/posts/" + code, {
        method: "DELETE",
        headers: {
          Authorization: getRequestPayload.headers["Authorization"],
        },
        redirect: "follow",
      });
      const response = getFetch.json();
      navigate("/mainFeed", { replace: true });
      Swal.fire({
        title: "게시물 삭제",
        text: response.message,
        // getFetch.data.message,
        icon: "success",
        confirmButtonColor: "#002560",
        confirmButtonText: "확인",
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    GetHandler();
  }, [GetHandler]);

  return (
    <div className={styled.div}>
      <BasicModal open={modalPaging} close={modalPageCloseHandler}>
        <CreatePage
          close={modalPageCloseHandler}
          onPost={GetHandler}
          mode={"UPDATE"}
          data={DIARYCONTENT}
        />
      </BasicModal>
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
              <h4>평범한</h4>
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
                          modalPageOpenHandler();
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
                          DeleteHandler();
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
  );
};

export default DetailGraph;
