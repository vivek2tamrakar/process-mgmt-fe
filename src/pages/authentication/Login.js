import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../src/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  LeftBanner,
  LoginContainer,
  LoginBox,
  InputBox,
  BoxInput,
  ForgotPasswordLink,
  GotoRegister,
} from "./styles";
import Image from "../../assets/images/loginpageimage.jpg";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login({ username, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setIsLoggedIn(true);
        navigate("/");
      }
    });
  };

  return (
    <LoginContainer>
      <LeftBanner>
        <img src={Image} alt="Login Banner" />
      </LeftBanner>
      <LoginBox>
        <InputBox>
          <p className="logintext">Login</p>
          <form>
            <BoxInput>
              <label>Email Address</label>
              <Input
                size="large"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter email address"
              />
            </BoxInput>
            <BoxInput>
              <label>Password</label>
              <Input
                size="large"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <ForgotPasswordLink>
                <Link to="/">Forgot Password?</Link>
              </ForgotPasswordLink>
              <Button
                onClick={handleLogin}
                type="primary"
                size="large"
                loading={loading}
              >
                Login
              </Button>
            </BoxInput>
          </form>
          <GotoRegister>
            <p>
              Don't have an account? <Link to="/register">Register?</Link>
            </p>
          </GotoRegister>
        </InputBox>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
