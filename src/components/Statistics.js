import { useCallback, useEffect } from 'react';
import { ProgressBar, Card } from '../UI';
import styled from './Statistics.module.css';

const Statistics = () => {
  
  let StatisticsProgressBar = {
    CoditionPer: {
      R: 0,
      G: 0,
      B: 0,
    },
  };
 
  const StatisticsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        'https://oildummy-29863-default-rtdb.firebaseio.com/mockup/diary1.json'
      );
      // 일단 실험용으로 데이터 불러와보기

      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();
   

      StatisticsProgressBar.CoditionPer.R = data.document.confidence.negative;
      StatisticsProgressBar.CoditionPer.G = data.document.confidence.neutral;
      StatisticsProgressBar.CoditionPer.B = data.document.confidence.positive;
      console.log('R : '+StatisticsProgressBar.CoditionPer.R);
    } catch (error) {
      console.log(error);
    }
  },[StatisticsProgressBar])

  
  let content = <h3>일주일간 신용재님이 가장 많이 느낀 감정입니다</h3>;

  const MonthhHadnler = () => {
    content = <h3>한달간 신용재님이 가장 많이 느낀 감정입니다</h3>;
    // 감정 막대기에 한달치 평균 감정이 들어갈예쩡
  };

  const hundredhHadnler = () => {
    content = <h3>100일간 신용재님이 가장 많이 느낀 감정입니다</h3>;
  };

  useEffect(() => {
    StatisticsHandler();
  }, [StatisticsHandler]);

  return (
    <div className={styled.div}>
      <span><h1>통계 페이지</h1></span>
      <div className="ConditionBox">
        <div>
          <button>Week</button>
          <button onClick={MonthhHadnler}>Month</button>
          <button onClick={hundredhHadnler}>Hundred</button>
        </div>

        {content}
        <Card maxWidth="600">
          <span className={styled.span}>
            <h4>부정적</h4>
            <div>
              <ProgressBar
                color={'#DB9791'}
                persent={StatisticsProgressBar.CoditionPer['R'].toFixed(1)}
              />
            </div>
            <h4>{StatisticsProgressBar.CoditionPer['R'].toFixed(1)}%</h4>
          </span>
          <span className={styled.span}>
            <h4>모호한</h4>
            <div>
              <ProgressBar
                color={'#CADB69'}
                persent={StatisticsProgressBar.CoditionPer['G'].toFixed(1)}
              />
            </div>
            <h4>{StatisticsProgressBar.CoditionPer['G'].toFixed(1)}%</h4>
          </span>
          <span className={styled.span}>
            <h4>긍정적</h4>
            <div>
              <ProgressBar
                color={'#80ABDB'}
                persent={StatisticsProgressBar.CoditionPer['B'].toFixed(1)}
              />
            </div>
            <h4>{StatisticsProgressBar.CoditionPer['B'].toFixed(1)}%</h4>
          </span>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;