import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
const HeaderBack = styled.div`
  min-width: 350px;
  position: fixed;
  top: 0px;
  background-color: #ddd4c9;
  width: 100vw;
  height: 40px;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;
const Logo = styled.img`
  width: 100px;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderBack>
      <Logo
        src={logo}
        onClick={() => {
          navigate('/');
        }}
      />
    </HeaderBack>
  );
}

export default Header;
