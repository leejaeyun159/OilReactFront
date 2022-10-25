import styled from "styled-components";

const Text = styled.div`
  font-weight: 500;
  font-size: 15px;
  color: black;
`;

const Highlight = (props) =>{
    return (
    <Text> “ {props.text} ” </Text>
    );
} 

export default Highlight;
