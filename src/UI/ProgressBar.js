import styled from "styled-components";

const ProgressBar = styled.span`
  background-color: ${(props) => props.color};
  width: ${(props) => props.persent}%;
  height: 40px;
  margin: 0px 5%;
  animation: progressbar 2.5s ease-out;
  white-space: nowrap;
  font-weight:700;
  text-align:right;
  font-size:15px;
  font-family: "Oswald", sans-serif;
  color:
  
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