import styled from 'styled-components'

const UIConditionGradation = styled.div`
  border: 0;
  border-radius: 50%;
  box-shadow: 0px 13px 11px grey;
  background-image: linear-gradient(
    to bottom,
    white,
    rgb(
      ${(props) => props.color["R"]},
      ${(props) => props.color["G"]},
      ${(props) => props.color["B"]},
      255
    )
  );
  width: 300px;
  height: 300px;
  margin: auto;
`;


export default UIConditionGradation;