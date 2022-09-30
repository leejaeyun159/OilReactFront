import styled from "styled-components";

const Text = styled.div`
  font-family: "Noto Serif KR", serif;
  font-weight: 400;
  font-size: 12px;
  color: white;
  bottom: 50%;
  right: 40px;
  padding: 6px 4px;
  margin: 10px;
  background-color: var(--maincolor);
`;

const Highlight = (props) =>{
    return (
    <Text> “ {props.text} ” </Text>
    );
} 

export default Highlight;
