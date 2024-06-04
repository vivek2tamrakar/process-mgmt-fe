import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { LOGINAPI } from 'constants/api';
import usePost from 'hooks/usePost';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const { mutateAsync: AdminLogin } = usePost();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitForm = (values, { setErrors, setStatus, setSubmitting }) => {
    const { username, password } = values;

    AdminLogin({
      url: LOGINAPI,
      type: 'details',
      payload: { username, password },
      token: true
    })
      .then((res) => {
        if (res?.message === 'MESSAGES.USER.LOGIN_SUCCESS') {
          const { token } = res;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('role', JSON.stringify(res.role));
          toast.success(' successfully Login', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        if (err?.data?.error === 'MESSAGES.USER.INVALID_LOGIN') {
          toast.error('Invalid Credentials ', {
            position: toast.POSITION.TOP_RIGHT
          });
        } else {
          toast.error('Server Error 500!', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={{
          username: 'admin123@gmail.com',
          password: 'admin123',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        // Using the updated submitForm function
        onSubmit={submitForm}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login" // Corrected from "-password-login" to "password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to="/forgot-password" color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button fullWidth size="large" type="submit" variant="contained" sx={{ backgroundColor: 'success.dark' }} color="success">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12} sx={{ mt: 0 }}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  Don't have an accout &nbsp;
                  <Link component={RouterLink} to="/register">
                    Register ?
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
