import styled, { keyframes } from 'styled-components';

const Back = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate = keyframes`     
  from {transform: rotate(0deg)}
  to {transform: rotate(360deg)}
`;
const SpinnerMain = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 4px solid #6495ed;
  border-top-color: transparent;
  border-left-color: transparent;
  animation: ${rotate} 0.7s infinite linear;
  &.profilePoto {
    width: 25px;
    height: 25px;
  }
`;

const Spinner = () => {
  return (
    <>
      <Back>
        <SpinnerMain></SpinnerMain>
      </Back>
    </>
  );
};

export default Spinner;
