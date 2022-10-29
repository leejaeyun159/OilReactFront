import styled from "styled-components";
import { Link } from "react-router-dom";
import { TemporaryDrawer } from "../MUI";
import OilContext from '../store/oil-context';
import { useContext } from  'react';

const OilNav = styled.div`
  padding: 20px 0;
  display: flex;
  align-contents: center;
  background: var(--maincolor);
  box-shadow: 0 0 7px 0 #000000;
`;
const LeftChild = styled.div`
  padding:5px 0;
  margin:auto;
}
`;

const HeadText = styled.div`
  margin: auto;
`;

const RightChild = styled.div`
  padding: 9px 0;
  margin:0 auto;
`;

const Img = styled.img`
  width: "${(props) => props.width}";
  height: "${(props) => props.height}";
  src: "${(props) => props.logo}";
`;


const Nav = (props) => {
  const authCtx = useContext(OilContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <OilNav>
      <LeftChild>
        {isLoggedIn ? (
          <Link to="/mainFeed">
            <Img src="/asset/oilLogo.png" width="40px" height="30px" />
          </Link>
        ) : (
          <Link to="/login">
            <Img src="/asset/oilLogo.png" width="40px" height="30px" />
          </Link>
        )}
      </LeftChild>
      <HeadText></HeadText>
      <RightChild>
        {isLoggedIn ? (
            <TemporaryDrawer>
              <Img src="/asset/category.png" width="22px" height="22px" />
            </TemporaryDrawer>
        ) : (
          /*카테고리 모달창 */
          <Link to="/login">
            <Img src="/asset/login.png" width="22px" height="22px" />
          </Link>
        )}
      </RightChild>
    </OilNav>
  );
};

export default Nav;
