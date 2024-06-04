// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import './app.css';
import ScrollTop from 'components/ScrollTop';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <ThemeCustomization>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeCustomization>
  </QueryClientProvider>
);

export default App;
