// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Profile from './Profile';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {matchesXs && <Box sx={{ width: '100%', ml: 'auto' }} />}

      <Box sx={{ ml: 'auto' }}> </Box>
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
