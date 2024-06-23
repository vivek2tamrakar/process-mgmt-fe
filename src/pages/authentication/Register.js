import { Grid,Stack, Typography,Box,Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthCard from './AuthCard';
import FirebaseRegister from './auth-forms/AuthRegister';
import AuthWrapper from './AuthWrapper';
import logo from '../../assets/images/logo.jpg'

const Register = ({ children }) => (
  // <AuthWrapper>
  <Box sx={{ minHeight: '100vh' }}>
  <div
    style={{
      width: '100%',
      height: '90px',
      // backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background:'#fff !important'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '25px' }}>
      <b style={{color:'#fff'}}><img src={logo} style={{width: '20%',padding: '38px'}} /></b>
    </div>
    <div style={{ display: 'flex', gap: '20px', marginRight: '25px' }}>
    <button style={{ height: '40px', width: '95px', borderRadius: '25px', border: 'none', color: 'white', background:'#003E6B' }}>
        <Link component={RouterLink} to="/login" style={{ textDecoration: 'none', color:'#fff' }}>
          Login
        </Link>
      </button>
      <button style={{ height: '40px', width: '95px', borderRadius: '25px', border: 'none', color: 'white',background:'#003E6B' }}>
        <Link component={RouterLink} to="/register" style={{ textDecoration: 'none',color:'#fff' }}>
          Register
        </Link>
      </button>
    </div>
  </div>
  <div style={{marginTop:'30px'}}>
    <Grid container spacing={3}>
        <Grid item xs={7}>
        <img src='https://i.postimg.cc/Sx8PcxDP/6310507.jpg'></img>
        </Grid>
      <Grid item xs={4}>
      <div style={{marginTop:'30px'}}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Register Our Company </Typography>
          </Stack>
        <Grid item xs={12}>
          <FirebaseRegister />
        </Grid>
        </div>
      </Grid>
    </Grid>
    </div>
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
  // </AuthWrapper>
);

export default Register;
