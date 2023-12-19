import { memo, useEffect, useState } from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useLocation } from 'react-router-dom';
import {
  Icon,
  IconButton,
  useMediaQuery,
  Box,
  styled,
  useTheme
} from '@mui/material';

import { themeShadows } from 'app/components/MatxTheme/themeColors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { navigations } from 'app/navigations';
import { topBarHeight } from 'app/utils/constant';

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
    fontFamily: 'Inter',
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

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
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
    for (var i= 0;i<navigations.length;i++) {
      let item = navigations[i];
      let selected = item.children?.filter((menu) => menu.path.includes(path.detail))
      if (selected?.length) {
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
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>
          <Box className="breadcrumb">
             <h2>{headName}</h2><ChevronRightIcon/><h3>{childName}</h3>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <StyledIconButton>
              <NotificationsNoneOutlinedIcon />
            </StyledIconButton>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
