import type { NextPage } from "next";
import styled from "styled-components"
import Layout from '../../components/Layout';

const Svg = styled.svg`
width: 25px;
height: 25px;
`;

const Container = styled.div`
border: 1px solid black;
`;

const SubContainer = styled.div`
margin: 10px;
border: 1px solid black;
`;

const MainTitleBox = styled.div`
border: 1px solid black;
`;

const Qbox = styled.div`
border: 1px solid black;
`;

const UserInfoBox = styled.div`
border: 1px solid black;
`;

const CuriousBox = styled.div`
border: 1px solid black;
`;

const AnswerBox = styled.div`
border: 1px solid black;

`;

const Community: NextPage = () => {
  return (
    <Layout hasTabBar title="동네 사람들">
    <Container>
      <SubContainer>
        <MainTitleBox>
          <div>질문해요</div>
        </MainTitleBox>
        <Qbox>
          <div>Q.</div> What is the best mandu restaurant?
        </Qbox>
        <UserInfoBox>
          <div>용희</div>
          <div>18시간 전</div>
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
            <span>궁금해요 1</span>
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
            <span>답변 1</span>
          </AnswerBox>
        </div>
      </SubContainer>
      <div>
        <Svg
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
        </Svg>
      </div>
    </Container>
    </Layout>
  );
};

export default Community;