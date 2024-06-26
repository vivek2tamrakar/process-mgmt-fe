import React from "react";
import { ButtonContainer, Header, LogoContainer, MainContainer } from "./Style";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.34ac6a4edb0bef53937e.jpg";

const HomeLayout = () => {
  return (
    <>
      <MainContainer>
        <Header>
          <LogoContainer>
            <img src={logo} alt="noimage" />
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
