import React from "react";
import { ButtonContainer, Header, LogoContainer, MainContainer } from "./Style";
import { Link, Outlet } from "react-router-dom";
const HomeLayout = () => {
  return (
    <>
      <MainContainer>
        <Header>
          <LogoContainer>
            <p>Project Management</p>
          </LogoContainer>
          <ButtonContainer>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </ButtonContainer>
        </Header>
        <Outlet />
      </MainContainer>
    </>
  );
};

export default HomeLayout;
