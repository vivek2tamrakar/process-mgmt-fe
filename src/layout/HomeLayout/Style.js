import styled from "styled-components";

export const MainContainer = styled.div``;
export const Header = styled.div`
  background-color: #003e6b;
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
  color: white;
  padding: 30px;
  p {
    font-size: 18px;
    font-weight: 700;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 30px;
  button {
    height: 35px;
    width: 85px;
    color: #003e6b;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    border: none;
    cursor: pointer;
  }
  button:hover {
    box-shadow: 0px 0px 12px 0px white;
    transition: 0.3s;
  }
`;
export const Content = styled.div`
  img {
    width: 100%;
    height: calc(100vh - 70px);
  }
`;
export const Footer = styled.div``;
