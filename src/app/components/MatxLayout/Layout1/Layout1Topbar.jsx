import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useLocation } from 'react-router-dom';
import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
  Box,
  styled,
  useTheme
} from '@mui/material';

import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { navigations } from 'app/navigations';
import { Breadcrumb } from 'app/components';
import { topBarHeight } from 'app/utils/constant';

import { Span } from '../../Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';
import ShoppingCart from '../../ShoppingCart';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  "& .breadcrumb":{
    display: 'flex',
    alignItems: 'center',
    "& h2":{
      fontSize:'16px',
      fontWeight: '500',
      color : '#71717A'
    },
    "& h3":{
      fontSize:'16px',
      fontWeight: '500',
      color: '#4658AC'
    }
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary }
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' }
}));



const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();
  const { pathname } = useLocation();
  const [headName, setHeadName] = useState('')
  const [childName, setChildName] = useState('')
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  const UpdateBreadCrumb = (path) => {

    console.log("---event items")
    console.log(path.detail)
    console.log(navigations)
    for (var i= 0;i<navigations.length;i++) {
      let item = navigations[i];
      let selected = item.children.filter((menu) => menu.path == path.detail)
      if (selected.length) {
        setChildName(selected[0]['name'])
        setHeadName(item.name)
        break;
      }
    }
  }
  
  useEffect(() => {
    let details = {detail: pathname}
    UpdateBreadCrumb(details)
    document.addEventListener("BreadcrumbEvent", UpdateBreadCrumb);
      return () => {
        document.removeEventListener("BreadcrumbEvent", UpdateBreadCrumb);
      }
  }, []);

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          {/* <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton> */}


          <Box className="breadcrumb">
             <h2>{headName}</h2><ChevronRightIcon/><h3>{childName}</h3>
          </Box>
          {/* <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox> */}
        </Box>

        <Box display="flex" alignItems="center">
          {/* <MatxSearchBox /> */}

          <StyledIconButton>
              <NotificationsNoneOutlinedIcon />
            </StyledIconButton>

          {/* <ShoppingCart />

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hi <strong>{user.name}</strong>
                  </Span>
                </Hidden>
                <Avatar src={user.avatar} sx={{ cursor: 'pointer' }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Icon> settings </Icon>
              <Span> Settings </Span>
            </StyledItem>

            <StyledItem onClick={logout}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu> */}
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
