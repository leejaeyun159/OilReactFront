import { useCallback, useEffect, useState, useContext } from "react";
import AuthContext from "../store/oil-context";
import styled from "./Statistics.module.css";
import MyResponsiveLine from "./StaticsticsChart";

const data = [
  {
    id: "기쁨",
    color: "hsl(211, 70%, 50%)",
    data: [
      {
        x: "01",
        y: 35,
      },
      {
        x: "03",
        y: 5,
      },
      {
        x: "08",
        y: 12,
      },
      {
        x: "11",
        y: 56,
      },
      {
        x: "13",
        y: 29,
      },
      {
        x: "14",
        y: 42,
      },
      {
        x: "18",
        y: 23,
      },
      {
        x: "19",
        y: 52,
      },
      {
        x: "20",
        y: 42,
      },
      {
        x: "28",
        y: 34,
      },
      {
        x: "30",
        y: 29,
      },
      {
        x: "31",
        y: 20,
      },
    ],
  },
  {
    id: "슬픔",
    color: "hsl(339, 70%, 50%)",
    data: [
      {
        x: "01",
        y: 23,
      },
      {
        x: "03",
        y: 67,
      },
      {
        x: "08",
        y: 14,
      },
      {
        x: "11",
        y: 34,
      },
      {
        x: "13",
        y: 44,
      },
      {
        x: "14",
        y: 45,
      },
      {
        x: "18",
        y: 13,
      },
      {
        x: "19",
        y: 85,
      },
      {
        x: "20",
        y: 8,
      },
      {
        x: "28",
        y: 29,
      },
      {
        x: "30",
        y: 45,
      },
      {
        x: "31",
        y: 64,
      },
    ],
  },
  {
    id: "중립",
    color: "hsl(62, 70%, 50%)",
    data: [
      {
        x: "01",
        y: 33,
      },
      {
        x: "03",
        y: 42,
      },
      {
        x: "08",
        y: 55,
      },
      {
        x: "11",
        y: 41,
      },
      {
        x: "13",
        y: 59,
      },
      {
        x: "14",
        y: 75,
      },
      {
        x: "18",
        y: 64,
      },
      {
        x: "19",
        y: 18,
      },
      {
        x: "20",
        y: 58,
      },
      {
        x: "28",
        y: 40,
      },
      {
        x: "30",
        y: 85,
      },
      {
        x: "31",
        y: 45,
      },
    ],
  },
];

let StatisticsData = [];
//   id: '',
//   // color: {
//   //   R: 0,
//   //   G: 0,
//   //   B: 0,
//   // },  컬러를 고정값으로 넣      v어야 하나?
//   data: [{ x: '', y: '' }],
// };
const Statistics = () => {
  const [isDay, setIsDay] = useState("7");
  const [stat, setStat] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const TOKEN = authCtx.token;
  const nickname = localStorage.getItem("USERNAME");

  const StatisticsHandler = useCallback(async (DAY = 7) => {
    try {
      setIsLoading(true);
      const getFetch = await fetch(
        "http://54.64.27.138:8080/api/statistics?tab=" + DAY,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
          redirect: "follow",
        }
      );

      const response = await getFetch.json();

      console.log(response);
      for (const key in response) {
        StatisticsData.push({
          id: response[key].id,
          data: response[key].data,
        });
      }
      //  id= 감정 , y축에 감정0~100% , x에 Days
      //color : RGB(??,??,??) 형식으로 데이터를 넣고   data는 x축 날짜 mmdd  y축이 감정 %

      // const MyResponsiveLine = ({ data })
      // const MyResponsiveLine = ({ StatisticsData }) => (

      // );
      setStat(StatisticsData);
      // console.log(StatisticsData);
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
          지난 {isDay}일간 {nickname} 회원님이 가장 많이 느낀 감정입니다
        </h4>
      </div>
      <div className={styled.StatisticsBox}>
        {!isLoading && <MyResponsiveLine data={data} />}
        {isLoading && <h4>데이터를 불러오는 중입니다..</h4>}
      </div>
    </div>
  );
};

export default Statistics;
