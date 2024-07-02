import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../src/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { LeftBanner, LoginContainer, LoginBox, InputBox, BoxInput, ForgotPasswordLink, GotoRegister } from './styles';
import Image from '../../assets/images/loginpageimage.jpg';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import { toast } from 'react-hot-toast';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let valid = true;
    let errors = { username: '', password: '' };

    if (!username) {
      errors.username = '* Require';
      valid = false;
    } else if (!validateEmail(username)) {
      errors.username = 'Invalid email format';
      valid = false;
    }

    if (!password) {
      errors.password = '* Require';
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      dispatch(login({ username, password })).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setIsLoggedIn(true);
          toast.success('Login successful!');
          navigate('/');
        } else {
          toast.error('Login failed. Please check your credentials.');
        }
      });
    }
  };

  return (
    <LoginContainer className="ppppllll">
      {/* <LeftBanner>
        <img src={Image} alt="Login Banner" />
      </LeftBanner> */}
      <LoginBox>
        <InputBox>
          <p className="logintext">Login</p>
          <form onSubmit={handleLogin}>
            <BoxInput>
              <label>Email Address {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}</label>
              <Input
                size="large"
                type="email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (e.target.value && errors.username) {
                    setErrors((prev) => ({ ...prev, username: '' }));
                  }
                }}
                placeholder="Enter email address"
              />
            </BoxInput>
            <BoxInput>
              <label>Password {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}</label>
              <Input
                size="large"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value && errors.password) {
                    setErrors((prev) => ({ ...prev, password: '' }));
                  }
                }}
                placeholder="Enter Password"
              />

              <ForgotPasswordLink>
                <Link to="/">Forgot Password?</Link>
              </ForgotPasswordLink>
              <Button
                // onClick={handleLogin}
                type="primary"
                size="large"
                loading={loading}
                style={{ backgroundColor: '#003e6b' }}
                htmlType="submit"
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
