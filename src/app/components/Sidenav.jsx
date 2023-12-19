import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { styled , Avatar, Box} from '@mui/material';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { navigations } from 'app/navigations';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
  paddingTop: '1.5rem'
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  fontFamily: 'Inter',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' }
}));

const ProfileInfoEle = styled('div')(() => ({
  width: '100%',
  color: 'white',
  fontFamily: 'Inter',
  position: 'absolute',
  paddingBottom: '20px',
  display: 'flex',
  justifyContent:'center',
  alignItems: 'center',
  bottom:0,
  "& .avatar-element": {
    marginLeft: '10px',
    display: 'block',
    "& h2":{
      fontSize: '16px',
      lineHeight: '19.36px',
      fontWeight: '500',
      margin: '0'
    },
    "& h3":{
      fontSize: '16px',
      lineHeight: '19.36px',
      fontWeight: '400',
      margin: '0'
    }
  }
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <MatxVerticalNav items={navigations} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
      <ProfileInfoEle>
         <Avatar src={'/assets/images/face-1.jpg'} sx={{ cursor: 'pointer' }} />
         <Box className="avatar-element">
           <h2>Tim Cook</h2>
           <h3>timcook@force.com</h3>
         </Box>
      </ProfileInfoEle>
    </Fragment>
  );
};

export default Sidenav;
