import React, { useState } from "react";
import {
  LeftBanner,
  LoginContainer,
  LoginBox,
  BoxInput,
  GotoRegister,
  BySigningUpText,
  RegisterInputBox,
} from "./styles";
import Image from "../../assets/images/loginpageimage.jpg";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import { register } from "../../../src/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const handleRegister = () => {
    dispatch(register({ name, email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/login");
      }
    });
  };

  return (
    <>
      <LoginContainer>
        <LeftBanner>
          <img src={Image} alt="noimage" />
        </LeftBanner>
        <LoginBox>
          <RegisterInputBox>
            <p className="logintext">Register Our Company</p>
            <form>
              <BoxInput>
                <label>Company</label>
                <Input
                  size="large"
                  type="text"
                  placeholder="Enter Company Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </BoxInput>
              <BoxInput>
                <label>Email Address</label>
                <Input
                  size="large"
                  type="email"
                  placeholder="demo@company.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </BoxInput>
              <BoxInput>
                <label>Phone Number</label>
                <Input size="large" type="number" placeholder="Enter Number" />
              </BoxInput>
              <BoxInput>
                <label>Password</label>
                <Input
                  size="large"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <BySigningUpText>
                  By Signing up, you agree to our{" "}
                  <Link> Terms of Service </Link> and{" "}
                  <Link>Privacy Policy </Link>
                </BySigningUpText>

                <Button type="primary" size="large" onClick={handleRegister}>
                  Register
                </Button>
              </BoxInput>
            </form>
            <GotoRegister>
              <p>
                Already have an accout<Link to="/login"> Login ?</Link>
              </p>
            </GotoRegister>
          </RegisterInputBox>
        </LoginBox>
      </LoginContainer>
    </>
  );
};

export default Register;
