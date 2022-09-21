import styled from "styled-components";

const UIProgressBar = styled.div`
  background-color: ${(props) => props.color};
  width: ${(props) => props.persent}%;
  height: 20px;
  animation: progressbar 2.5s ease-out;
  margin:auto;
  float:left;

  @keyframes progressbar {
    from {
      width: 0%;
    }
    to {
    }
  }
`;

export default UIProgressBar;