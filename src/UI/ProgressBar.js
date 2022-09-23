import styled from "styled-components";

const ProgressBar = styled.span`
  background-color: ${(props) => props.color};
  width: ${(props) => props.persent}%;
  height: 20px;
  margin: 0px 5% 8px 5%;
  animation: progressbar 2.5s ease-out;
  
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