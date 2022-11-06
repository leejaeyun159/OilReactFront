import styled from "styled-components";

const Dot = styled.div`
  background-color: ${(props) =>
    props.color === "positive"
      ? "red"
      : props.color === "neutral"
      ? "green"
      : props.color === "negative"
      ? "blue"
      : "white"};
  border: solid white 2px;
  border-radius: 15px;
  width: 9px;
  height: 9px;
  margin: 0 auto;
`;
export default Dot;
