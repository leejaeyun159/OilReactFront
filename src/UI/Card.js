import styled from 'styled-components'
const Card = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 11px #bbbbbb;
    border-radius: 15px;
    width:100%;
    margin:30px auto ;
    min-width:375px;
    max-width:700px;
    
    & label{
        text-align:center;
        font-weight:300;
        margin-top:5px;
    }
`;
export default Card;