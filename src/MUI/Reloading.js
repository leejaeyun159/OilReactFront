import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import styled from 'styled-components';

const Wrapper = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border: none;
  background-color: transparent;
  gap:5px;
  margin-bottom: 8px;


  &:hover {
    animation: reload 0.8s forwards;
    cursor: pointer;
  }
  @keyframes reload {
    from {
    }
    to {
      background: var(--maincolor);
      color:white;
    }
  }
`;

const Reloading = (props)=>{
    return (
        <Wrapper onClick={props.onClick}>
            <p>새 글을 불러옵니다 </p><RotateLeftIcon/>
        </Wrapper>
    )
}

export default Reloading;