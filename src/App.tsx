import { BrowserRouter } from 'react-router-dom';
import Routes from '~/routers';

function App() {
  return (
    <div className="App bg-stone-100">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
