import { BrowserRouter } from 'react-router-dom';
import Routes from '~/routers';
import AppContextProvider from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </AppContextProvider>
  );
}

export default App;
