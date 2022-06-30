import { User, Post, Answer } from '@prisma/client';
import type { NextPage } from "next";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from "styled-components"
import useSWR from 'swr';
import Image from 'next/image';

const Container = styled.div`
border: 1px solid black;
padding: 50px;

`;

const MainTitle = styled.div`
border: 1px solid black;
border-bottom: none;
text-align: center;
`;

const UserInfoBox = styled.div`
border: 1px solid black;
border-bottom: none;
`; 

const ProfileImg = styled(Image)`
/* border: 1px solid black; */
border-radius: 50px;
`;

const UserInfo = styled.div`
border: 1px solid black;
border-left: none;
border-right: none;
`;

const QuestionsBox = styled.div`
border: 1px solid black;
border-top: none;
`;

const QAstateBox = styled.div`
border: 1px solid black;
border-bottom: none;
border-top: none;
`;

const Qbox = styled.div`
  display: flex;
`;

const AnswerBox = styled.div`
border: 1px solid black;
border-bottom: none;
`;

const Svg = styled.svg`
width: 25px;
height: 25px;
`;

const ReplyBox = styled.form`
  border: 1px solid black;
  border-top: none;
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 20px;
`
const Textarea = styled.textarea`
  border: 5px solid rgb(121, 186, 136);
  border-radius: 10px;
  margin-bottom: 20px;
  /* width: 450px; */
  height: 100px;
  padding: 10px;
  resize: none;
  position: relative;
  top: 20px;
  outline-color: #2e732d;
`;

const Button = styled.button`
position: relative;
width: 100px;
height: 25px;
color: #ffffff;
background-color: #7eca8b;
border: 0;
outline: 0;
`;

interface AnswerWithUSer extends Answer{
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
      answers: number;
      wondering: number;
    };
    answers: AnswerWithUSer[];
}

interface CommunityPostResponse {
  ok: boolean;
  post: PostWithUser;
  isWondering: boolean;
}


const CommunityPostDetail: NextPage = () => {
  const [postData, setPostData] = useState("")
  const router = useRouter();
  console.log(router.query.id)
  const {data, error } = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
    ,{ refreshInterval: 1000 }
    )
  console.log(data);  

  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setPostData(value);
  }
  
  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`/api/posts/${router.query.id}/answers`, {
        method : "POST",
        body: JSON.stringify({
          "answer" : postData
        }),
        headers: {
          "Content-Type": "application/json"
         } // api를 호출 할 때마다 headers를 설정해야 한다.
       })
      //  setPostData("") // 초기화 안됨 해결 해야 함
  }
  const onClick = () => {    
    fetch(`/api/posts/${router.query.id}/wonder`, {
        method : "POST",
        body: JSON.stringify({
        "id" : router.query.id
         }),
        headers: {
          "Content-Type": "application/json"
         } // api를 호출 할 때마다 headers를 설정해야 한다.
       })    
  }
  
  return (
    <Container>
      <MainTitle>
        동네질문
      </MainTitle>
      <UserInfoBox>
        <ProfileImg
          width={50}
          height={50}
          src={`https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/${data?.post?.user?.avatar}/avatar`}   
          alt=""
          />   
        <UserInfo>
          <p>{data?.post?.user?.name}</p>
          {/* <Link href={`/users/profiles/${data?.post?.user?.id}`}>   */}            
            {/* <a> */}
              <p>View profile &rarr;</p>
            {/* </a> */}
          {/* </Link>           */}
        </UserInfo>
      </UserInfoBox>
      <div>
        <QuestionsBox>
          <div>Q.</div>
          {data?.post?.question}
        </QuestionsBox>
        <QAstateBox>
          <div>
            <Svg 
              // style={ data?.isWondering ? { color:'green'} : {color : "black"} }
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </Svg>
            <Button onClick={onClick}>궁금해요 {data?.post?._count?.wondering}</Button>
          </div>
          <Qbox>
            <Svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </Svg>
            <div>{data?.post?._count?.answers}</div>
          </Qbox>
        </QAstateBox>
      </div>
      <AnswerBox>         
        {data?.post?.answers?.map(answer => (
          <div key={answer?.id}>
          <ProfileImg
          width={50}
          height={50}
          src={`https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/${answer?.user?.avatar}/avatar`}   
          alt=""
          />   
          <div key={answer.id}>
          <div/>
          <div>
            <div>{answer.user.name}</div>
            <p>{answer?.answer}</p>
          </div>
        </div>
        </div>
        ))}       
      </AnswerBox>
      <ReplyBox onSubmit={onSubmit}>
        <Textarea onChange={onChange}        
          rows={4}
          placeholder="Answer this question!"
        />
        <Button>
          Reply
        </Button>
      </ReplyBox>
    </Container>
  );
};

export default CommunityPostDetail;