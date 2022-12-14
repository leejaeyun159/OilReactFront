import styled from "styled-components";

const ProgressBar = styled.div`
  background-color: ${(props) => props.color};
  width: ${(props) => props.persent}%;
  height: 15px;
  margin-left: 0;
  animation: progressbar 2s ease-out;
  white-space: nowrap;
  font-weight: 700;
  text-align: right;
  font-size: 15px;
  font-family: "Oswald", sans-serif;
  border-radius: 8px;
  box-shadow: 5px 3px 10px -5px;

  @keyframes progressbar {
    from {
      width: 0%;
    }
    to {
    }
  }
`;
;

export default ProgressBar;