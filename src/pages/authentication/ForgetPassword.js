import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../../src/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { ForgetPasswordContainer, ForgetPasswordBox, ForgetInputBox, BoxInput } from './styles';
import { Input, Button } from 'antd';
import { toast } from 'react-hot-toast';

const ForgetPassword = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({ username: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();

    let valid = true;
    let errors = { username: '' };

    if (!username) {
      errors.username = '* Require';
      valid = false;
    } else if (!validateEmail(username)) {
      errors.username = 'Invalid email format';
      valid = false;
    }

    setErrors(errors);

    if (valid) {
      dispatch(forgetPassword({ username })).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success('Password Sent to your Email Id.');
          navigate('/login');
        } else {
          toast.error('Forget Password failed.');
        }
      });
    }
  };

  return (
    <ForgetPasswordContainer className="ppppllll">
      <ForgetPasswordBox>
        <ForgetInputBox>
          <p className="logintext">Forget Password</p>
          <form onSubmit={handleForgetPassword}>
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
            <Button
                // onClick={handleLogin}
                type="primary"
                size="large"
                loading={loading}
                style={{ backgroundColor: '#003e6b', width: "100%", marginTop: "30px" }}
                htmlType="submit"
              >
                Confirm
              </Button>
            </form>
        </ForgetInputBox>
      </ForgetPasswordBox>
    </ForgetPasswordContainer>
  );
};

export default ForgetPassword;
