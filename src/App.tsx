import { BrowserRouter } from 'react-router-dom';
import Routes from '~/routers';

function App() {
  return (
    <div className="App bg-stone-100 dark:bg-slate-900">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
