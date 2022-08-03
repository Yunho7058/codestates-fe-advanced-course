import styled, { g } from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Spinner from '../util/Spinner';

export const PostsBack = styled.div`
  width: 100%;

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f6e9;
`;
export const PostsBox = styled.div`
  background-color: white;
  width: 80%;
  height: 90%;
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
`;

export const PostsListBox = styled.div`
  width: 90%;
  height: 80%;
  padding-top: 1px;
  padding-bottom: 1px;
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const PaginationBox = styled.div`
  width: auto;
  height: 10%;
  /* border: 1px solid; */
  display: flex;
  column-gap: 5px;
  align-items: center;
`;
export const PostsListSC = styled.div`
  /* border: 1px solid; */
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  width: 95%;
  height: 9%;
  &:hover {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;
export const PostsTitle = styled.div`
  width: 80%;
  height: 35px;
  line-height: 35px;
  /* border: 1px solid; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 25px;
  cursor: pointer;
  &:hover {
    color: #969696;
  }
`;
export const PostsUserId = styled.div`
  width: 20%;
  height: 35px;
  line-height: 35px;

  text-align: center;
`;
export const Btn = styled.div`
  border: 1px solid;
  width: 30px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  cursor: pointer;
  color: ${({ active, pActive }) => {
    if (active === pActive) {
      return 'red';
    } else {
      return 'green';
    }
  }};
`;

const PostSearchBox = styled.div`
  display: flex;
  align-items: center;

  border-radius: 10px;
  background-color: #dcdcdc;
`;
const PostSearchSelect = styled.select`
  width: 60px;
  height: 36px;
  border: 0px;
  text-align: center;
  border-radius: 10px;
  outline: none;
  background-color: #dcdcdc;
`;
const PostSearchInput = styled.input`
  width: 200px;
  height: 30px;
  outline: none;
  border: 0px;
  padding-left: 10px;
  padding-right: 10px;
`;
const PostSearchBtn = styled.div`
  width: 50px;
  height: 32px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
`;
const PostNotSearch = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PostHeader = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  border-bottom: 3px solid #d2d2d2;

  > div.title {
    width: 80%;
  }
  > div.user {
    width: 20%;
  }
`;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [paginationNum, setPaginationNum] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [viewPostLength, setViewPostLength] = useState(0);
  const [filterPostsData, setFilterPostsData] = useState([]);
  const [isSpinner, setIsSpinner] = useState(true);
  const [findStr, setFindStr] = useState('');
  const [selectValue, setSelectValue] = useState('title');
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setAllPosts(res.data);
        setFilterPostsData(res.data);
        setViewPostLength(res.data.length);
        setIsSpinner(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setPosts(allPosts.slice(0, 10));
  }, [allPosts]);

  const handlePagination = (option) => {
    if (option === '+' && paginationNum < Math.ceil(viewPostLength / 10)) {
      setPaginationNum(paginationNum + 1);
    } else if (option === '-' && paginationNum > 1) {
      setPaginationNum(paginationNum - 1);
    }
  };

  useEffect(() => {
    let num = paginationNum * 10;
    setPosts(filterPostsData.slice(num - 10, num));
  }, [paginationNum]);

  const handlePostMove = (postId) => {
    navigate(`/${postId}`);
  };

  const handleInput = (key) => (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (selectValue === 'title') {
      setPaginationNum(1);
      const filter = allPosts.filter((el) => {
        return el.title.includes(`${searchValue}`);
      });
      setFindStr(searchValue);
      setPosts(filter.slice(0, 10));
      setFilterPostsData(filter);
      setViewPostLength(filter.length);
    } else if (selectValue === 'user') {
      setPaginationNum(1);
      const filter = allPosts.filter((el) => {
        return String(el.userId).includes(`${searchValue}`);
      });
      setPosts(filter.slice(0, 10));
      setFilterPostsData(filter);
      setViewPostLength(filter.length);
    }
  };
  const enterSearch = (e) => {
    if (e.key === 'Enter') {
      return handleSearch();
    }
  };
  const changeSelectValue = (e) => {
    setSearchValue('');
    setFindStr('');
    setSelectValue(e.target.value);
  };
  return (
    <PostsBack>
      <Header></Header>

      <PostsBox>
        {isSpinner ? (
          <Spinner></Spinner>
        ) : (
          <>
            {' '}
            <PostsListBox>
              <PostHeader>
                <div className="title">제목</div>
                <div className="user">작성자</div>
              </PostHeader>
              {posts.length > 0 ? (
                posts.map((el) => {
                  return (
                    <PostsListSC
                      key={el.id}
                      onClick={() => handlePostMove(el.id)}
                    >
                      {findStr ? (
                        <PostsTitle>
                          {el.title.split(findStr)[0]}
                          <span style={{ color: 'red' }}>{findStr}</span>
                          {el.title.split(findStr)[1]}
                        </PostsTitle>
                      ) : (
                        <PostsTitle>{el.title}</PostsTitle>
                      )}

                      <PostsUserId> {el.userId} 님</PostsUserId>
                    </PostsListSC>
                  );
                })
              ) : (
                <PostNotSearch>
                  검색한 게시물이 존재하지 않습니다.
                </PostNotSearch>
              )}
            </PostsListBox>
            <PostSearchBox>
              <PostSearchSelect name="search" onChange={changeSelectValue}>
                {/* <option value="" hidden>
              선택
            </option> */}
                <option key="제목" value="title">
                  제목
                </option>
                <option key="작성자" value="user">
                  작성자
                </option>
              </PostSearchSelect>
              <PostSearchInput
                type="text"
                value={searchValue}
                onChange={handleInput()}
                onKeyPress={enterSearch}
                placeholder="Search"
              />
              <PostSearchBtn onClick={() => handleSearch()}>검색</PostSearchBtn>
            </PostSearchBox>
            <PaginationBox>
              <Btn onClick={() => handlePagination('-')}> + </Btn>
              {new Array(Math.ceil(viewPostLength / 10))
                .fill(0)
                .map((el, idx) => {
                  return (
                    <Btn
                      active={idx + 1}
                      pActive={paginationNum}
                      key={idx}
                      onClick={() => setPaginationNum(idx + 1)}
                    >
                      {idx + 1}
                    </Btn>
                  );
                })}

              <Btn onClick={() => handlePagination('+')}> - </Btn>
            </PaginationBox>
          </>
        )}
      </PostsBox>
    </PostsBack>
  );
}

export default PostList;