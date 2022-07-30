import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const PostBack = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PostBox = styled.div`
  width: 80%;
  height: 90%;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const PostListBox = styled.div`
  width: 90%;
  height: 80%;
  padding-top: 1px;
  padding-bottom: 1px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1%;
`;
export const PaginationBox = styled.div`
  width: 90%;
  height: 10%;
  border: 1px solid;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const PostList = styled.div`
  border: 1px solid;
  display: flex;
  justify-content: space-around;
  width: 95%;
  height: 9%;
`;
export const PostTitle = styled.div`
  width: 80%;
  height: 35px;
  line-height: 35px;
  border: 1px solid;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const PostUserId = styled.div`
  width: 20%;
  height: 35px;
  line-height: 35px;
  border: 1px solid;
  text-align: center;
`;
export const Btn = styled.div`
  border: 1px solid;
  width: 5%;
  text-align: center;
  line-height: 30px;
  height: 30px;
  cursor: pointer;
`;

function Post() {
  const [posts, setPosts] = useState([]);
  const [viewPosts, setviewPosts] = useState([]);
  const [paginationNum, setPaginationNum] = useState(1);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setviewPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setPosts(viewPosts.slice(0, 10));
  }, [viewPosts]);
  console.log(posts);
  const handlePagination = (option) => {
    if (option === '+' && paginationNum < 10) {
      setPaginationNum(paginationNum + 1);
    } else if (option === '-' && paginationNum > 1) {
      setPaginationNum(paginationNum - 1);
    }
  };
  useEffect(() => {
    let num = paginationNum * 10;
    setPosts(viewPosts.slice(num - 10, num));
  }, [paginationNum]);

  useEffect(() => {}, [paginationNum]);
  return (
    <PostBack>
      <PostBox>
        <PostListBox>
          {posts.map((el) => {
            return (
              <PostList key={el.id}>
                <PostTitle>{el.title}</PostTitle>
                <PostUserId>작성자 {el.userId}</PostUserId>
              </PostList>
            );
          })}
        </PostListBox>
        <PaginationBox>
          <Btn onClick={() => handlePagination('-')}> + </Btn>
          <Btn onClick={() => setPaginationNum(1)}> 1 </Btn>
          <Btn onClick={() => setPaginationNum(2)}> 2 </Btn>
          <Btn onClick={() => setPaginationNum(3)}> 3 </Btn>
          <Btn onClick={() => setPaginationNum(4)}> 4 </Btn>
          <Btn onClick={() => setPaginationNum(5)}> 5 </Btn>
          <Btn onClick={() => setPaginationNum(6)}> 6 </Btn>
          <Btn onClick={() => setPaginationNum(7)}> 7 </Btn>
          <Btn onClick={() => setPaginationNum(8)}> 8 </Btn>
          <Btn onClick={() => setPaginationNum(9)}> 9 </Btn>
          <Btn onClick={() => setPaginationNum(10)}> 10 </Btn>
          <Btn onClick={() => handlePagination('+')}> - </Btn>
        </PaginationBox>
      </PostBox>
    </PostBack>
  );
}

// handlePagination(90, 100) 대시 stata 변경
// useEffect로 저 stata 변경시 함수 실행되게
export default Post;
