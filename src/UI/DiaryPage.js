import styled from "styled-components";

const ConditionPreview = styled.div`
  border: solid white 2px;
  border-radius: 15px;
  background-color: rgb(
    ${(props) => (props.preview["R"] / 100) * 255},
    ${(props) => (props.preview["G"] / 100) * 255},
    ${(props) => (props.preview["B"] / 100) * 255}
  );
  width: 8px;
  height: 8px;
  position: absolute;
  box-shadow: 0px 3px 7px #bbbbbb;
  right: 8px;
  bottom: 8px;
`;

const Background = styled.div`
  box-shadow: 0px 2px 9px #bbbbbb;
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
    color: var(--maincolor);
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
    color: black;
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
    text-align: left;
    width: 120px;
    z-index: 0;
  }

  &:hover,
  &:active,
  &:focus {
    animation: focusOn 0.4s forwards;
    cursor: pointer;
  }
  &:link,
  &:visited {
    animation: focusOut 0.2s forwards;
  }

  @keyframes focusOn {
    from {
    }
    to {
      transform: scale(1.03);
      box-shadow: 0px 2px 9px grey;
      background-color: #f7faff;
    }
  }

  @keyframes focusout {
    from {
      transform: scale(1);
      box-shadow: 0px 2px 9px #bbbbbb;
    }
    to {
    }
  }
`;

const DiaryPage = (props) => {
  return (
    <Background>
      <div className="mainTitle">{props.title}</div>
      <div className="weatherDay">
        {props.days} | {props.weather}
      </div>
      <div className="MMDD">{props.mmdd}</div>
      <ConditionPreview preview={props.preview} />
    </Background>
  );
};
export default DiaryPage;
