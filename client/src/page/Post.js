import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Spinner from '../util/Spinner';
import { AiOutlineComment } from 'react-icons/ai';

function Post() {
  const postUrlId = useParams().id;
  const [postData, setPostData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [isSpinner, setIsSpinner] = useState({ post: true, comment: true });
  const [isShowComment, setIsShowComment] = useState(false);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postUrlId}`)
      .then((res) => {
        setPostData(res.data);
        setIsSpinner({ ...isSpinner, post: false });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/comments`)
      .then((res) => {
        setCommentsData(
          res.data.filter((el) => {
            return el.postId === Number(postUrlId);
          })
        );
        setIsSpinner({ ...isSpinner, comment: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleIsShowComment = () => {
    setIsShowComment(!isShowComment);
  };
  return (
    <PostBack>
      <Header></Header>
      <PostCommentBox>
        {isSpinner.comment && isSpinner.post ? (
          <Spinner />
        ) : (
          <>
            <PostBox>
              <PostTitle>
                {postData.title}
                <PostUser>작성자 {postData.userId} 님 </PostUser>
              </PostTitle>
              <PostContent>
                {postData.body}
                <PostCommentCount onClick={() => handleIsShowComment()}>
                  <AiOutlineComment size={23} />
                  댓글 {commentsData.length}개
                </PostCommentCount>
              </PostContent>
            </PostBox>
            {isShowComment && (
              <CommentsBox>
                {commentsData.map((el, idx) => {
                  return (
                    <CommentBox key={el.id}>
                      <CommentName>{el.name}</CommentName>
                      <CommentBody>{el.body}</CommentBody>
                    </CommentBox>
                  );
                })}
              </CommentsBox>
            )}
          </>
        )}
      </PostCommentBox>
    </PostBack>
  );
}

export default Post;

const PostBack = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  min-width: 350px;
  align-items: flex-start;
  background-color: #f7f6e9;
`;
const PostCommentBox = styled.div`
  background-color: white;
  padding: 15px;
  margin-top: 50px;
  margin-bottom: 20px;
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  row-gap: 10px;
  margin-top: 50px;
  border-radius: 20px;

  /* box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.3); */
`;
const PostBox = styled.div`
  width: 95%;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(248, 248, 255, 0.7);
  border-radius: 15px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
`;
//rgba(248, 248, 255, 0);
const CommentsBox = styled.div`
  background-color: rgba(248, 248, 255, 0.7);
  border-radius: 15px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  width: 95%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1px;
  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
`;

const PostTitle = styled.div`
  padding: 5px;
  font-weight: 600;
  width: 90%;

  position: relative;
  font-size: 24px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.3); */
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
`;
const PostContent = styled.div`
  padding: 5px;
  font-size: 20px;
  width: 90%;

  position: relative;
  border-radius: 15px;
  @media screen and (max-width: 630px) {
    font-size: 16px;
  }
`;
const PostUser = styled.div`
  position: absolute;
  bottom: -20px;
  right: 10px;
  font-size: 15px;
  @media screen and (max-width: 400px) {
    font-size: 12px;
    bottom: -12px;
  }
`;
const PostCommentCount = styled.div`
  position: absolute;
  bottom: -20px;
  right: 10px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  > svg {
    position: absolute;
    left: -28px;
    bottom: -2px;
  }
  @media screen and (max-width: 600px) {
    font-size: 11px;
    bottom: -10px;
  }
`;

const CommentBox = styled.div`
  width: 90%;
  margin-top: 5px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const CommentName = styled.div`
  padding: 5px;
  width: 90%;

  font-size: 18px;
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
const CommentBody = styled.div`
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  width: 90%;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
