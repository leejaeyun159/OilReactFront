import styled from 'styled-components'

const ConditionPreview = styled.div`
  border: solid white 2px;
  border-radius: 15px;
  background-color: ${(props) => props.condition};
  width: 8px;
  height: 8px;
  position: absolute;
  box-shadow: 0px 3px 7px #bbbbbb;
  right:8px;
  bottom:8px;
`;

const Background = styled.div`
  box-shadow: 0px 2px 15px #bbbbbb;
  border-radius: 0 0 15px 0;
  height: 80px;
  margin: 10px auto 0 auto;
  min-width: 280px;
  max-width: 700px;
  background-color: var(--backBlue);
  position: relative;

  & > .mainTitle {
    position: absolute;
    left: 20px;
    top: 20px;
    color:var(--maincolor);
    font-weight: 700;
    z-index: 2;
  }
  & > .weatherDay {
    position: absolute;
    left: 20px;
    top: 40px;
    font-size: 14px;
    font-weight: 400;
    z-index: 2;
  }
  & > .MMDD {
    position: absolute;
    right: 30px;
    top: -15px;
    font-size: 70px;
    font-weight: 700;
    font-family: "Oswald", sans-serif;
    color: #baceef;
    letter-spacing: -5px;
    z-index: 1;
  }
`;

const DiaryPage =(props)=>{
    return (
      <Background>
        <div className="mainTitle">{props.main}</div>
        <div className="weatherDay">{props.days} | {props.weather}</div>
        <div className="MMDD">{props.mmdd}</div>
        <ConditionPreview condition="var(--maincolor)" />
      </Background>
    );
}
export default DiaryPage;