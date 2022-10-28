import styled from "styled-components";

const Text = styled.span`
  background-color: var(--maincolor);
  font-weight: 700;
  font-size: 14px;
  color: white;
  padding: 5px 20px;
  border-radius: 8px;
`;

const Highlight = (props) =>{
    return <Text>{props.text}</Text>;
} 

export default Highlight;
