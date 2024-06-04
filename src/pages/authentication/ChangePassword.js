import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, FormHelperText } from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { ChangePassword } from 'constants/api';
import usePatch from 'hooks/usePatch';
import { toast } from 'react-toastify';

const ChangepassWord = () => {
  const loginuser = localStorage.getItem('user');
  const loginUserdata = JSON.parse(loginuser);
  const { mutateAsync: ChangePass } = usePatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNEWPassword] = useState(false);
  const [showNewConfirmPassword, setShowNEWConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNEWPassword(!showNewPassword);
  };
  const handleClickShowNewConfirmPassword = () => {
    setShowNEWConfirmPassword(!showNewConfirmPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitForm = (values, { setErrors, setStatus, setSubmitting }) => {
    const { currentPassword, newPassword } = values;

    ChangePass({
      url: ChangePassword,
      type: 'details',
      payload: { oldPassword: currentPassword, newPassword: newPassword, id: loginUserdata?.id },
      token: true
    })
      .then((res) => {
        toast.success('Password Changed Successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        navigate('/dashboard');
      })
      .catch((err) => {
        if (err?.data?.MESSAGE === 'ERROR.OLD_AND_NEW_PASSWORD_SAME') {
          toast.error('Old And New Password Will Not Same', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        } else if (err?.data?.MESSAGE === 'ERROR_PASSWORD_MISS_MATCH') {
          toast.error('Incorrect Old Password', {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
      });
  };

  return (
    <Box sx={{ maxWidth: '700px', mx: 'auto' }}>
      <MainCard>
        <Grid item>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Change Password
          </Typography>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: ''
            }}
            validationSchema={Yup.object().shape({
              currentPassword: Yup.string().max(255).required('Current Password is required'),
              newPassword: Yup.string().max(255).required('New Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm Password is required')
            })}
            onSubmit={submitForm}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="current-password">Current Password</InputLabel>
                      <OutlinedInput
                        id="current-password"
                        type={showPassword ? 'text' : 'password'}
                        value={values.currentPassword}
                        name="currentPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter current password"
                        fullWidth
                        error={Boolean(touched.currentPassword && errors.currentPassword)}
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
                      />
                      {touched.currentPassword && errors.currentPassword && (
                        <FormHelperText error id="current-password-error">
                          {errors.currentPassword}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="new-password">New Password</InputLabel>
                      <OutlinedInput
                        id="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        value={values.newPassword}
                        name="newPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        fullWidth
                        error={Boolean(touched.newPassword && errors.newPassword)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowNewPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.newPassword && errors.newPassword && (
                        <FormHelperText error id="new-password-error">
                          {errors.newPassword}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                      <OutlinedInput
                        id="confirm-password"
                        type={showNewConfirmPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        name="confirmPassword"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        fullWidth
                        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowNewConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showNewConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <FormHelperText error id="confirm-password-error">
                          {errors.confirmPassword}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        // disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: 'success.dark' }}
                        color="success"
                      >
                        Change Password
                      </Button>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </MainCard>
    </Box>
  );
};

export default ChangepassWord;
