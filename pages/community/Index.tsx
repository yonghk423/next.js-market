import { Post, User } from "@prisma/client";
import type { NextPage } from "next";
import Link from 'next/link';
import styled from "styled-components"
import useSWR from 'swr';
import Layout from '../../components/Layout';

const Svg = styled.svg`
width: 25px;
height: 25px;
`;

const BtnSvg = styled.svg`
background-color: #4fc24f;
color: white;
border-radius: 100px;
width: 50px;
height: 50px;
position: fixed;
bottom: 0;
right: 0;
cursor: pointer;
z-index: 1;
`;

const Container = styled.div`
padding: 10px;
border: 1px solid black;
`;

const SubContainer = styled.div`
margin: 10px;
border: 1px solid black;
`;

const MainTitleBox = styled.div`
padding: 5px;
border: 1px solid black;
`;

const Qbox = styled.div`
padding: 5px;
border: 1px solid black;
`;

const UserInfoBox = styled.div`
padding: 5px;
border: 1px solid black;
`;

const CuriousBox = styled.div`
padding: 5px;
border: 1px solid black;
`;

const AnswerBox = styled.div`
padding: 5px;
border: 1px solid black;

`;
interface PostsResponse {
  ok:boolean;
  posts: PostWithUser[];
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    wondering: number;
    answers: number;
  };
}

interface PostsResponse {
  ok: boolean;
  posts: PostWithUser[];
}

const Community: NextPage = () => {
  const { data } = useSWR<PostsResponse>(`/api/posts/Index`)
  console.log(data);
  return (
    <Layout hasTabBar title="동네 사람들">
    <Container>
      <SubContainer>
        
        {data?.posts?.map((post)=> (
          <div key={post.id}>
        <Link  href={`/community/${post.id}`}>
          <a>  
          <MainTitleBox>
          <div>질문해요</div>
        </MainTitleBox>
        <Qbox>
          <div>Q.{post.question}</div>  
        </Qbox>
        <UserInfoBox>
          <div>{post.user.name}</div>
          <div>{String(post.createdAt)}</div>
        </UserInfoBox>
        <div>
          <CuriousBox>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </Svg>
            <span>궁금해요 {post._count.wondering}</span>
          </CuriousBox>
          <AnswerBox>
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
            <span>답변 {post._count.answers}</span>
          </AnswerBox>
        </div>
        </a> 
        </Link>    
        </div>             
        ))}              
      </SubContainer>
      <div>
      <Link href={"/community/QWrite"}> 
        <a>
        <BtnSvg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </BtnSvg>
        </a>
      </Link>  
      </div>
    </Container>
    </Layout>
  );
};

export default Community;