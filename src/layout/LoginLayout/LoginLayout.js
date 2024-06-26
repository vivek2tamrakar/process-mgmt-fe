import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Link, Outlet } from "react-router-dom";
import {
  Header,
  HomeRoutes,
  LoginLayoutContainer,
  ProfileContainer,
  RightContent,
} from "./Style";
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
          <Header>
            <HomeRoutes>
              <Link>Home</Link>
              <Link>Inbox</Link>
              <Link>Task Manager</Link>
            </HomeRoutes>
            <ProfileContainer>
              <Button
                type="primary"
                onClick={handleLogout}
                style={{ backgroundColor: "#003e6b", color: "#ffffff" }}
              >
                Logout
              </Button>
            </ProfileContainer>
          </Header>
          <Outlet />
        </RightContent>
      </LoginLayoutContainer>
    </>
  );
};

export default LoginLayout;
