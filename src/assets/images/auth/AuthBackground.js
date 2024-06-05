import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import image from '../../images/homepage.jpg';
const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'absolute', zIndex: -1 }}>
      <img src={image} style={{ width: '100%', height: '605px' }} />
    </Box>
  );
};

export default AuthBackground;
