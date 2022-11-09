import { useCallback, useEffect, useState, useContext } from "react";
import AuthContext from "../store/oil-context";
import styled from "./Statistics.module.css";
import MyResponsiveLine from "./StaticsticsChart";
import moment from "moment/moment";
import { HOSTIP } from "../API/privateText";

const Statistics = () => {
  const [isDay, setIsDay] = useState("7");
  const [stat, setStat] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const TOKEN = authCtx.token;
  const nickname = localStorage.getItem("USERNAME");
  const Today = new Date();
  const standardDay = new Date();

  const StatisticsHandler = useCallback(async (DAY = 7) => {
    try {
      setIsLoading(true);
      const getFetch = await fetch(HOSTIP + "api/statistics?tab=" + DAY, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
        redirect: "follow",
      });

      const response = await getFetch.json();
      setStat(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    StatisticsHandler();
  }, [StatisticsHandler]);

  const nameHandler = (element) => {
    if (element === "Week") {
      setIsDay("7");
      StatisticsHandler(7);
    } else if (element === "Month") {
      setIsDay("30");
      StatisticsHandler(30);
    } else if (element === "Hundred") {
      setIsDay("100");
      StatisticsHandler(100);
    } else if (element === "Year") {
      setIsDay("365");
      StatisticsHandler(365);
    }
  };

  return (
    <div>
      <div className={styled.div}>
        <span>
          <h2>통계 페이지</h2>
          <h4>그동안의 감정을 분석하기</h4>
        </span>
        <div>
          <button onClick={() => nameHandler("Week")}>Week</button>|{" "}
          <button onClick={() => nameHandler("Month")}>Month</button>|{" "}
          <button onClick={() => nameHandler("Hundred")}>Hundred</button>|{" "}
          <button onClick={() => nameHandler("Year")}>Year</button>
        </div>
        <h4>
          {nickname} 회원님께서 지난 {isDay}일간 느낀 감정입니다
        </h4>
      </div>
      <div className={styled.StatisticsBox}>
        {!isLoading && <MyResponsiveLine data={stat.data} />}
        {isLoading && <h4>데이터를 불러오는 중입니다..</h4>}
        <span>
          <h4>
            {moment(standardDay.setDate(Today.getDate() - isDay)).format(
              "YYYY년 MM월 DD일부터"
            )}
          </h4>
          <h4>{moment(Today).format("YYYY년 MM월 DD일까지")}</h4>
        </span>
      </div>
    </div>
  );
};

export default Statistics;
