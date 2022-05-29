import type { NextPage } from "next";
import styled from "styled-components"

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

const CommunityPostDetail: NextPage = () => {
  return (
    <Container>
      <MainTitle className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        동네질문
      </MainTitle>
      <UserInfoBox>
        <UserImgBox>
          <UserImg/>
        </UserImgBox>
        <UserInfo>
          <p>Steve Jebs</p>
          <p>
            View profile &rarr;
          </p>
        </UserInfo>
      </UserInfoBox>
      <div>
        <QuestionsBox>
          <div>Q.</div> What is the
          best mandu restaurant?
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
            <div>궁금해요 1</div>
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
            <div>답변 1</div>
          </div>
        </QAstateBox>
      </div>
      <AnswerBox>
        <div>
          <div/>
          <div>
            <div>
              Steve Jebs
            </div>
            <div>2시간 전</div>
            <p>
              The best mandu restaurant is the one next to my house.
            </p>
          </div>
        </div>
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