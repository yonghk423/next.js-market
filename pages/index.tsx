import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from "styled-components"

const Container = styled.div`  
  padding: 10px;
`;

const ItemListBox = styled.div`
  border: 1px solid black;
  display: flex;
  border: 1px solid gray;
  padding: 4px;  
  justify-content: space-between;
`;
const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: gray;
`
const ItemBox = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const InfoBox = styled.div`
`;
const StateImgBox = styled.div``;

const BtnBox = styled.div`
`;

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
`;

const Home: NextPage = () => {
  return (
    <Container>
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <ItemListBox key={i}>          
          <ItemBox>  
            <ImgBox></ImgBox>
            <InfoBox>
              <h3>New iPhone 14</h3>
              <div>Black</div>
              <div>$95</div>
            </InfoBox>            
          </ItemBox>
          <StateImgBox>
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
              <div>2</div>
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
              <div>1</div>
            </div>
          </StateImgBox>
        </ItemListBox>
      ))}
      <BtnBox>
        <BtnSvg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </BtnSvg>
      </BtnBox>
    </Container>
  );
}

export default Home
