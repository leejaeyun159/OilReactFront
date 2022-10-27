import styled from "styled-components";

const Text = styled.div`
  background-color: var(--maincolor);
  font-weight: 500;
  font-size: 15px;
  color: white;
  padding: 5px 20px;
  border-radius: 8px;
`;

const Highlight = (props) =>{
    return <Text>{props.text}</Text>;
} 

export default Highlight;
