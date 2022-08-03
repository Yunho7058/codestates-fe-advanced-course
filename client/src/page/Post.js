import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/Header';

export const PostBack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PostCommentBox = styled.div`
  margin-top: 50px;
  border: 1px solid;
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  row-gap: 10px;
`;
export const PostBox = styled.div`
  border: 1px solid;
  width: 90%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
export const CommentsBox = styled.div`
  border: 1px solid;
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1px;
`;

export const PostTitle = styled.div`
  padding: 5px;
  border: 1px solid;
  width: 90%;
  height: 30%;
  position: relative;
`;
export const PostContent = styled.div`
  padding: 5px;
  border: 1px solid;
  width: 90%;
  height: 50%;
  position: relative;
`;
export const PostUser = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;
`;
export const PostCommentCount = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;
`;

export const CommentBox = styled.div`
  border: 1px solid;
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
export const CommentName = styled.div`
  border: 1px solid;
  padding: 5px;
  width: 90%;
  height: 25px;
`;
export const CommentBody = styled.div`
  border: 1px solid;
  padding: 5px;
  width: 90%;
`;

function Post() {
  const postUrlId = useParams().id;
  const [postData, setPostData] = useState({});
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postUrlId}`)
      .then((res) => {
        setPostData(res.data);
        console.log(res.data);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(commentsData);
  return (
    <PostBack>
      <Header></Header>
      <PostCommentBox>
        <PostBox>
          <PostTitle>
            {postData.title}
            <PostUser>작성자 {postData.userId} </PostUser>
          </PostTitle>
          <PostContent>
            {postData.body}
            <PostCommentCount>댓글 {commentsData.length}개</PostCommentCount>
          </PostContent>
        </PostBox>
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
      </PostCommentBox>
    </PostBack>
  );
}

export default Post;
