import type { NextPage } from "next";
import styled from "styled-components"
import Layout from '../../components/Layout';

const Container = styled.div`
padding: 50px;
`;

const LiveListBox = styled.div`
/* border: 1px solid black; */
`;

const LiveImg = styled.div`
border: 1px solid black;
padding: 80px;
`;

const LiveItemTitle = styled.div``;

const Svg = styled.svg`
width: 25px;
height: 25px;
background-color: #4fc24f;
color: white;
border-radius: 100px;
width: 50px;
height: 50px;
position: fixed;
bottom: 0;
right: 0;
cursor: pointer; 
`;
const LiveBtn = styled.div`
`;
const Live: NextPage = () => {
  return (
    <Layout hasTabBar title="실시간">
    <Container>
      {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <LiveListBox key={i}>
          <LiveImg/>
          <LiveItemTitle>iphon13 pro</LiveItemTitle>
        </LiveListBox>
      ))}
      <LiveBtn>
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
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          ></path>
        </Svg>
      </LiveBtn>
    </Container>
    </Layout>
  );
};

export default Live;