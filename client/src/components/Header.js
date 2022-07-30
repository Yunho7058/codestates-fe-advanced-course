import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const HeaderBack = styled.div`
  position: fixed;
  top: 0px;
  background-color: #d7ac87;
  width: 100vw;
  height: 50px;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderBack>
      <div
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로
      </div>
      <div>사전과제</div>
    </HeaderBack>
  );
}

export default Header;
