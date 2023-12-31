import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
        <MatxTheme>
          <CssBaseline />
          {content}
        </MatxTheme>
    </SettingsProvider>
  );
};

export default App;
