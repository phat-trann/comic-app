import { BrowserRouter } from 'react-router-dom';
import Routes from '~/routers';
import ComicListContext from './context/ComicList';

function App() {
  return (
    <ComicListContext>
      <div className="App">
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </div>
    </ComicListContext>
  );
}

export default App;
