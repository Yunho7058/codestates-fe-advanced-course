import Post from './page/Post';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
