// material-ui
import { Box, useMediaQuery,Link } from '@mui/material';

// project import
import Profile from './Profile';
import MobileSection from './MobileSection';
// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
    <div style={{textAlign:'center',width:'100%',display:'flex',columnGap:'12%',marginLeft:'2%'}}>
          <Link style={{ textDecoration: 'none', color:'#000' }}>
              Home
            </Link>
            <Link  style={{ textDecoration: 'none', color:'#000' }}>
              Inbox
            </Link>
            <Link  style={{ textDecoration: 'none', color:'#000' }}>
              Task Manager
            </Link>
        </div>
      {matchesXs && <Box sx={{ width: '100%', ml: 'auto' }} />}

      <Box sx={{ ml: 'auto' }}>
        
       </Box>
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
