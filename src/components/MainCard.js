import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography, Button, Box } from '@mui/material';
import Highlighter from './third-party/Highlighter';

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
};

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentSX = {},
      elevation,
      secondary,
      setOpenAddModal,
      shadow,
      sx = {},
      title,
      codeHighlight,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();
    boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;
    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderRadius: 2,
          borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
          boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
          ':hover': {
            boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
          },
          '& pre': {
            m: 0,
            p: '16px !important',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.75rem'
          },
          ...sx
        }}
        className="pppppppp"
      >
        {title && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
              {title === 'Transformations' && (
                <>
                  <Button variant="contained" sx={{ marginRight: '20px' }} onClick={() => setOpenAddModal(true)}>
                    Add Transformation
                  </Button>
                </>
              )}
              {title === 'Recipes' && (
                <>
                  <Button variant="contained" sx={{ marginRight: '20px' }} onClick={() => setOpenAddModal(true)}>
                    Add Recipes
                  </Button>
                </>
              )}
              {title === 'Dietitian' && (
                <>
                  <Button variant="contained" sx={{ marginRight: '20px' }} onClick={() => setOpenAddModal(true)}>
                    Create Dietitian
                  </Button>
                </>
              )}
              {title === 'User Diet Plans' && (
                <>
                  <Button variant="contained" sx={{ marginRight: '20px' }} onClick={() => setOpenAddModal(true)}>
                    Add Diet Plan
                  </Button>
                </>
              )}
              {title === 'Story' && (
                <>
                  <Button variant="contained" sx={{ marginRight: '20px' }} onClick={() => setOpenAddModal(true)}>
                    Add Story
                  </Button>
                </>
              )}
              {title === 'Configuration' && (
                <>
                  <Button variant="contained" sx={{ marginRight: '20px' }} onClick={() => setOpenAddModal(true)}>
                    Add Configuration
                  </Button>
                </>
              )}
            </Box>
          </>
        )}

        {content ? <CardContent sx={contentSX}>{children}</CardContent> : children}

        {/* {!content && children} */}

        {codeHighlight && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Highlighter codeHighlight={codeHighlight} main>
              {children}
            </Highlighter>
          </>
        )}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  contentSX: PropTypes.object,
  divider: PropTypes.bool,
  elevation: PropTypes.number,
  secondary: PropTypes.node,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  codeHighlight: PropTypes.bool,
  content: PropTypes.bool,
  children: PropTypes.node
};

export default MainCard;
