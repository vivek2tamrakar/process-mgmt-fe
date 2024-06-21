import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Outlet } from "react-router-dom";
import { Header, LoginLayoutContainer, RightContent } from "./Style";
import LeftMenuBar from "./LeftMenuBar";
import { Button } from "antd";

const LoginLayout = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    setIsLoggedIn(false);
    dispatch(logout());
  };

  return (
    <>
      <LoginLayoutContainer>
        <LeftMenuBar />

        <RightContent>
          <Header className="swdef">
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>{" "}
          </Header>
          <Outlet />
        </RightContent>
      </LoginLayoutContainer>
    </>
  );
};

export default LoginLayout;
