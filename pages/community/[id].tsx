import { User, Post, Answer } from '@prisma/client';
import type { NextPage } from "next";
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from "styled-components"
import useSWR from 'swr';

const Container = styled.div`
border: 1px solid black;
padding: 50px;

`;

const MainTitle = styled.div`
border: 1px solid black;

`;

const UserInfoBox = styled.div`
/* border: 1px solid black; */

`; 

const UserImgBox = styled.div`
border: 1px solid black;
`;

const UserImg = styled.div`
border: 1px solid black;
width: 25px;
height: 25px;
border-radius: 50px;

`;

const UserInfo = styled.div`
border: 1px solid black;
`;

const QuestionsBox = styled.div`
border: 1px solid black;

`;

const QAstateBox = styled.div`
border: 1px solid black;
`;

const AnswerBox = styled.div`
border: 1px solid black;
`;

const Svg = styled.svg`
width: 25px;
height: 25px;
`;

const ReplyBox = styled.div`
  border: 1px solid black;
`

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
}


const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  console.log(router.query.id)
  const {data, error} = useSWR<CommunityPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null)
  console.log(data);
  return (
    <Container>
      <MainTitle className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        동네질문 {}
      </MainTitle>
      <UserInfoBox>
        <UserImgBox>
          <UserImg/>
        </UserImgBox>
        <UserInfo>
          {/* <Link href={`/users/profiles/${data?.post?.user?.id}`}>   */}
            <p>{data?.post.user.name}</p>
            <p>View profile &rarr;</p>
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
            <div>궁금해요 {data?.post._count.wondering}</div>
          </div>
          <div>
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
            <div>{data?.post._count.answers}</div>
          </div>
        </QAstateBox>
      </div>
      <AnswerBox>
        {data?.post.answers.map(answer => (
          <div key={answer.id}>
          <div/>
          <div>
            <div>{answer.user.name}</div>
            {/* <div>{answer.createdAt}</div> */}
            <p>{answer.answer}</p>
          </div>
        </div>
        ))}
        
      </AnswerBox>
      <ReplyBox>
        <textarea
          className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
          rows={4}
          placeholder="Answer this question!"
        />
        <button className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
          Reply
        </button>
      </ReplyBox>
    </Container>
  );
};

export default CommunityPostDetail;