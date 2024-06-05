import PropTypes from 'prop-types';
import { Box, Grid, Link } from '@mui/material';
import AuthCard from './AuthCard';
import AuthBackground from 'assets/images/auth/AuthBackground';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logoimage from '../../assets/images/download.png';
const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh' }}>
    <div
      style={{
        width: '100%',
        height: '65px',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '25px' }}>
        <b style={{color:'#fff'}}>Project Management</b>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginRight: '25px' }}>
        <button style={{ height: '40px', width: '95px', borderRadius: '25px', border: 'none', color: 'white' }}>
          <Link component={RouterLink} to="/login" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        </button>
        <button style={{ height: '40px', width: '95px', borderRadius: '25px', border: 'none', color: 'white' }}>
          <Link component={RouterLink} to="/register" style={{ textDecoration: 'none' }}>
            Register
          </Link>
        </button>
      </div>
    </div>
    <AuthBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 200px)' } }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
