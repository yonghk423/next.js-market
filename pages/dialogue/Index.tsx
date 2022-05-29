import type { NextPage } from "next";
import Layout from '../../components/Layout';
import styled from "styled-components"

const Container = styled.div`
border: 1px solid black
`;

const InfoBox = styled.div`
border: 1px solid black
`;

const UserImgBox = styled.div`
border: 1px solid black
`;

const UserImg = styled.div`
border: 1px solid black;
width: 25px;
height: 25px;
border-radius: 50px;
`;

const Dialogue: NextPage = () => {
  return (
    <Layout hasTabBar title="대화 나누기" >
    <Container >
      {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <InfoBox
          key={i}          
        >
          <UserImgBox>
            <UserImg/>
          </UserImgBox>
          <div>
            <p>Steve Jebs</p>
            <p>
              See you tomorrow in the corner at 2pm!
            </p>
          </div>
        </InfoBox>
      ))}
    </Container>
    </Layout>
  );
};

export default Dialogue;