import styled from 'styled-components';

export const Header = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0px 20px 0px 20px;
`;
export const Footer = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;
  width: 100%;
  left: 0;
  padding: 10px 20px 10px 0px;
  button {
    width: 85px;
    height: 35px;
    background-color: #003e6b;
    border: none;
    color: white;
    border-radius: 10px;
  }
`;
export const Content = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: -12px;
  input {
    width: 200px;
    height: 32px;
    padding: 13px;
    border-radius: 5px;
    border: 1px solid gray;
  }
`;
