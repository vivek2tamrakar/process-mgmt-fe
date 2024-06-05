import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  ButtonBase,
  CardContent,
  ClickAwayListener,
  Grid,
  IconButton,
  Paper,
  Popper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import ProfileTab from './ProfileTab';
import useGet from 'hooks/useGet';
// assets
import avatar1 from 'assets/images/users/avatar-1.png';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Userget } from 'constants/api';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  const loginuser = localStorage.getItem('user');
  const loginUserdata = JSON.parse(loginuser);
  const { mutateAsync: UserListGet } = useGet();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/');
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconBackColorOpen = 'grey.300';
  const fetchData = () => {
    UserListGet({
      url: `${Userget}/${loginUserdata?.id}`,
      type: 'details',
      token: true
    })
      .then((res) => {
        setUserProfile(res);
      })
      .catch((error) => {
        console.error('Error fetching data:12123', error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup={true}
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          {/* <Avatar alt="profile user" src={loginUserdata?.profilePic || avatar1} sx={{ width: 32, height: 32 }} /> */}
          <img
            alt="profile user"
            crossOrigin="anonymous"
            src={userProfile?.profilePic || avatar1}
            style={{ width: 32, height: 32, mx: 'auto', borderRadius: '50%', objectFit: 'cover' }}
          />
          <Typography variant="subtitle1">{userProfile?.name}</Typography>
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <CardContent sx={{ px: 2.5, pt: 3 }}>
                      <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <img
                              alt="profile user"
                              crossOrigin="anonymous"
                              src={userProfile?.profilePic || avatar1}
                              style={{ width: 32, height: 32, mx: 'auto', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            {/* <Avatar alt="profile user" src={loginUserdata?.profilePic || avatar1} sx={{ width: 32, height: 32 }} /> */}
                            <Stack>
                              <Typography variant="h6">{userProfile?.name}</Typography>
                              <Typography variant="body2" color="textSecondary" sx={{ width: '150px', wordBreak: 'break-word' }}>
                                {loginUserdata?.email}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <IconButton size="large" color="secondary" onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                            <Tab
                              sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textTransform: 'capitalize'
                              }}
                              icon={<UserOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                              label="Profile"
                              {...a11yProps(0)}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0} dir={theme.direction}>
                          <ProfileTab handleLogout={handleLogout} />
                        </TabPanel>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;
