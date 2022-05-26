import type { NextPage } from "next";
import styled from "styled-components"

const Container = styled.div`
padding: 50px;
`;

const MainBox = styled.div`
border: 1px solid black;
display: grid;
grid-template-columns: auto;
`;

const MainImg = styled.div`
  border: 1px solid black;  
  background-color: #75a475;
  padding: 90px;
`;

const MainInfoBox = styled.div`
border: 1px solid black;
`;

const ProfileImg = styled.div`
border: 1px solid black;
width: 50px;
height: 50px;
border-radius: 50px;
`;

const MainInfoDetailBox = styled.div`
  border: 1px solid black;
`;

const AddInfoBox = styled.div`
  border: 1px solid black;
`;

const AddInfoDetailBox = styled.div`
  border: 1px solid black;
`;

const AddInfoDetailImg = styled.div`
  padding: 50px;
  border: 1px solid black;
`;

const Svg = styled.svg`
width: 25px;
height: 25px;
`;

const ItemDetail: NextPage = () => {
  return (
    <Container>
      <MainBox>
        <MainImg></MainImg>
        <MainInfoBox>
          <ProfileImg>
          </ProfileImg>          
          <div>
            <p>Steve Jebs</p>
            <p>View profile &rarr;</p>
          </div>
        </MainInfoBox>
      </MainBox>  
        <MainInfoDetailBox>
          <h1>Galaxy S50</h1>
          <p>$140</p>
          <p>
            My money&apos;s in that office, right? If she start giving me some
            bullshit about it ain&apos;t there, and we got to go someplace else
            and get it, I&apos;m gonna shoot you in the head then and there.
            Then I&apos;m gonna shoot that bitch in the kneecaps, find out where
            my goddamn money is. She gonna tell me too. Hey, look at me when
            I&apos;m talking to you, motherfucker. You listen: we go in there,
            and that ni**a Winston or anybody else is in there, you the first
            motherfucker to get shot. You understand?
          </p>
          <div>
            <button>Talk to seller</button>
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </Svg>
            </div>
          </div>
        </MainInfoDetailBox>      
      <AddInfoBox>
        <h2>Similar items</h2>
        <div>
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <AddInfoDetailBox key={i}>
              <AddInfoDetailImg/>
              <h3>Galaxy S60</h3>
              <p>$6</p>
            </AddInfoDetailBox>
          ))}
        </div>
      </AddInfoBox>
    </Container>
  );
};

export default ItemDetail;