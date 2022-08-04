import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import PostList from './page/PostList';
import Post from './page/Post';

const GlobalStyled = createGlobalStyle`
body{
  margin: 0px;
  overflow-y: scroll;
 
font-family: 'IBM Plex Sans KR';

}
`;

function App() {
  return (
    <>
      <GlobalStyled />
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
