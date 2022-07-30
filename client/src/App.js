import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostList from './page/PostList';
import Post from './page/Post';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
