import React from "react";
import styled from "styled-components"
import Link from "next/link";
import { motion } from "framer-motion"

const Svg = styled(motion.svg)`
width: 25px;
height: 25px;
`;

const PeopleSvg = styled(motion.svg)`
position: relative;
left: 30px;
width: 25px;
height: 25px;
`;

const Nav = styled.nav`
display: flex;
justify-content: space-around;
position: fixed; /* 이 부분을 고정 */
bottom: 0; /* 하단에 여백 없이 */
width: 100%; /* 가로 사이즈를 브라우저에 가득 채움 */
border: 2px solid #496f4d;
`;

const Title = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
`;

const Home = styled.div`
  position: relative;
  left: 4.5px;
  font-weight: bold;
`;

const People = styled.div`
  position: relative;
  left: 10px;
  font-weight: bold;

`;

const Dialogue = styled.div`
  position: relative;
  left: -20px;
`;

const Profile = styled.div`
  position: relative;
  left: -15px;
  font-weight: bold;
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
              <Svg
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </Svg>
              <Home>홈</Home>    
            </a>
            </Link>
            <Link href="/community/Index">
            <a> 
              <PeopleSvg
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </PeopleSvg>
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
              <Svg
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" />
              </Svg>
              <Profile>나의 정보</Profile>    
            </a>
            </Link>                                                       
          </Nav>
          : null }
        </div>
      </div>
    )
}