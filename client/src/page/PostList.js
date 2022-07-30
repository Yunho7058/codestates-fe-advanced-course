import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export const PostsBack = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PostsBox = styled.div`
  width: 80%;
  height: 90%;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
`;

export const PostsListBox = styled.div`
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
export const PostsListSC = styled.div`
  border: 1px solid;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 95%;
  height: 9%;
`;
export const PostsTitle = styled.div`
  width: 80%;
  height: 35px;
  line-height: 35px;
  border: 1px solid;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const PostsUserId = styled.div`
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

const PostSearchBox = styled.div`
  display: flex;
  align-items: center;
`;
const PostSearchSelect = styled.select`
  width: 50px;
  height: 25px;
`;
const PostSearchInput = styled.input`
  width: 50px;
  height: 25px;
`;
const PostSearchBtn = styled.div`
  width: 50px;
  height: 25px;
  border: 1px solid;
`;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [copyPosts, setCopyPosts] = useState([]);
  const [paginationNum, setPaginationNum] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setCopyPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setPosts(copyPosts.slice(0, 10));
  }, [copyPosts]);

  const handlePagination = (option) => {
    if (option === '+' && paginationNum < 10) {
      setPaginationNum(paginationNum + 1);
    } else if (option === '-' && paginationNum > 1) {
      setPaginationNum(paginationNum - 1);
    }
  };
  useEffect(() => {
    let num = paginationNum * 10;
    setPosts(copyPosts.slice(num - 10, num));
  }, [paginationNum]);

  const handlePostMove = (postId) => {
    navigate(`/${postId}`);
  };

  console.log(copyPosts);
  return (
    <PostsBack>
      <Header></Header>
      <PostsBox>
        <PostsListBox>
          {posts.map((el) => {
            return (
              <PostsListSC key={el.id} onClick={() => handlePostMove(el.id)}>
                <PostsTitle>{el.title}</PostsTitle>
                <PostsUserId>작성자 {el.userId}</PostsUserId>
              </PostsListSC>
            );
          })}
        </PostsListBox>
        <PostSearchBox>
          <PostSearchSelect name="search">
            <option value="">선택</option>
            <option value="내용">내용</option>
            <option value="작성자">작성자</option>
          </PostSearchSelect>
          <PostSearchInput></PostSearchInput>
          <PostSearchBtn>검색</PostSearchBtn>
        </PostSearchBox>
        <PaginationBox>
          <Btn onClick={() => handlePagination('-')}> + </Btn>
          {new Array(Math.ceil(copyPosts.length / 10))
            .fill(0)
            .map((el, idx) => {
              return (
                <Btn key={idx} onClick={() => setPaginationNum(idx + 1)}>
                  {idx + 1}
                </Btn>
              );
            })}
          {/* <Btn onClick={() => setPaginationNum(1)}> 1 </Btn>
          <Btn onClick={() => setPaginationNum(2)}> 2 </Btn>
          <Btn onClick={() => setPaginationNum(3)}> 3 </Btn>
          <Btn onClick={() => setPaginationNum(4)}> 4 </Btn>
          <Btn onClick={() => setPaginationNum(5)}> 5 </Btn>
          <Btn onClick={() => setPaginationNum(6)}> 6 </Btn>
          <Btn onClick={() => setPaginationNum(7)}> 7 </Btn>
          <Btn onClick={() => setPaginationNum(8)}> 8 </Btn>
          <Btn onClick={() => setPaginationNum(9)}> 9 </Btn>
          <Btn onClick={() => setPaginationNum(10)}> 10 </Btn> */}
          <Btn onClick={() => handlePagination('+')}> - </Btn>
        </PaginationBox>
      </PostsBox>
    </PostsBack>
  );
}

// handlePagination(90, 100) 대시 stata 변경
// useEffect로 저 stata 변경시 함수 실행되게
export default PostList;

// 길이가 100이면 10으로 나눠 그면 10까지 표현
// 만약 95면 9.5고 무건 반올림
