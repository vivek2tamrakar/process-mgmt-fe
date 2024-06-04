import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// project import
import AuthForgotPassword from './auth-forms/AuthForgotPassword';
import AuthWrapper from './AuthWrapper';

// ================================|| REGISTER ||================================ //

const Forgotpassword = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Forgot Password </Typography>
        <Link variant="h6" component={RouterLink} to="/" color="text.primary" >
                   Login Page
                  </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthForgotPassword />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Forgotpassword;
