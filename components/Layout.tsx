import React from "react";
import styled from "styled-components"
import Link from "next/link";

const Svg = styled.svg`
width: 25px;
height: 25px;
`;

const Nav = styled.nav`
display: flex;
justify-content: space-around;
position: fixed; /* 이 부분을 고정 */
bottom: 0; /* 하단에 여백 없이 */
width: 100%; /* 가로 사이즈를 브라우저에 가득 채움 */
border: 1px solid black;
`;

const Title = styled.div`
  text-align: center;
`;

const Home = styled.div`
  position: relative;
  left: 4.5px;
`;

const People = styled.div`
  position: relative;
  left: -20px;
`;

const Dialogue = styled.div`
  position: relative;
  left: -20px;
`;

const Profile = styled.div`
  position: relative;
  left: -15px;
`;

interface LayoutProps {
    title?: string;
    canGoback?: boolean;
    hasTabBar?: boolean;
    children: React.ReactNode;
} 

export default function Layout({  
    title, 
    canGoback, 
    hasTabBar, 
    children 
  }:LayoutProps) {
    return (
      <div> 
        <div>
          { title ? <Title>{title}</Title> : null }
        </div>
        <div>{children}</div>
        <div>
          { hasTabBar ? 
          <Nav>
            <Link href="/">
            <a>
              <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </Svg>
              <Home>홈</Home>    
            </a>
            </Link>
            <Link href="/community/Index">
            <a>
              <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </Svg>
              <People>동네 사람들</People>    
            </a>
            </Link>
            {/* <Link href="/dialogue/Index">
            <a>
              <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </Svg>
              <Dialogue>대화 나누기</Dialogue>                  
            </a>
            </Link>             */}
            <Link href="/privacy/Index"> 
            <a>
              <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </Svg>
              <Profile>나의 배추</Profile>    
            </a>
            </Link>                                                       
          </Nav>
          : null }
        </div>
      </div>
    )
}