import styled from 'styled-components'
const Card = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    margin:0px auto ;
    min-width:280px;
    max-width:${(props)=> props.mxWidth}px;
    position:relative;
`;
export default Card;