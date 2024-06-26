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
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let valid = true;
    let errors = { name: "", email: "", password: "" };

    if (!name) {
      errors.name = "* Require";
      valid = false;
    }

    if (!email) {
      errors.email = "* Require";
      valid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
      valid = false;
    }

    if (!password) {
      errors.password = "* Require";
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      dispatch(register({ name, email, password })).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Company Registered!");
          navigate("/login");
        } else {
          toast.error("Server Error");
        }
      });
    }
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
            <form onSubmit={handleRegister}>
              <BoxInput>
                <label>
                  Company{" "}
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name}</span>
                  )}
                </label>
                <Input
                  size="large"
                  type="text"
                  placeholder="Enter Company Name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value && errors.name) {
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }
                  }}
                />
              </BoxInput>
              <BoxInput>
                <label>
                  Email Address{" "}
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email}</span>
                  )}
                </label>
                <Input
                  size="large"
                  type="email"
                  placeholder="demo@company.com"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value && errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                />
              </BoxInput>
              <BoxInput>
                <label>Phone Number</label>
                <Input size="large" type="number" placeholder="Enter Number" />
              </BoxInput>
              <BoxInput>
                <label>
                  Password{" "}
                  {errors.password && (
                    <span style={{ color: "red" }}>{errors.password}</span>
                  )}
                </label>
                <Input
                  size="large"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value && errors.password) {
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }
                  }}
                />
                <BySigningUpText>
                  By Signing up, you agree to our{" "}
                  <Link> Terms of Service </Link> and{" "}
                  <Link>Privacy Policy </Link>
                </BySigningUpText>

                <Button
                  type="primary"
                  size="large"
                  style={{ backgroundColor: "#003e6b" }}
                  htmlType="submit"
                >
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
