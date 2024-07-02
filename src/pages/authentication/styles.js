import styled from 'styled-components';

// Login Style
export const LoginContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 65px);
`;
export const LeftBanner = styled.div`
  width: 50%;
  img {
    width: 100%;
    height: calc(100vh - 70px);
  }
`;
export const LoginBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const InputBox = styled.div`
  background-color: white;
  height: 430px;
  width: 420px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  form {
    padding: 18px;
  }
  .logintext {
    text-align: center;
    font-size: 25px;
    font-weight: 600;
  }
`;
export const BoxInput = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
  label {
    color: #595959;
    font-size: 14px;
  }
`;
export const ForgotPasswordLink = styled.div`
  text-align: right;
  padding: 2px 6px 3px 0px;
  a {
    text-decoration: none;
    color: #003e6b;
  }
`;
export const GotoRegister = styled.div`
  text-align: center;
  margin-top: -15px;
  a {
    text-decoration: none;
    color: #003e6b;
  }
`;
// Register Style
export const RegisterInputBox = styled.div`
  background-color: white;
  height: 550px;
  width: 420px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  form {
    padding: 18px;
  }
  .logintext {
    text-align: center;
    font-size: 25px;
    font-weight: 600;
  }
`;
export const BySigningUpText = styled.div`
  text-align: left;
  font-size: 12px;
  padding: 10px 0px 10px 0px;
  a {
    text-decoration: none;
    color: #003e6b;
  }
`;
