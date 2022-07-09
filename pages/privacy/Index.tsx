// https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/<image_id>/public

import type { NextPage } from "next";
import Head from "next/head"
import styled from "styled-components"
import Layout from '../../components/Layout';
import useSWR from 'swr'
import Link from 'next/link';
import { useRouter } from "next/router";
import useUser from '../../libs/client/useUser';
import { User } from '@prisma/client';
import { motion } from "framer-motion"

const Container = styled.div`
  padding: 50px;
  margin: 60px;
  font-weight: bold;
  background-color: rgba(225, 225, 225, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const ImgUsernameBox = styled.div`
  padding: 10px;
  /* border: 2px solid #496f4d; */
  border-bottom: none;
  display: grid;
  justify-content: center;
  justify-items: center;
`;

const Img = styled.img`
  border-radius: 20px;
  width: 300px;
  height: 300px;  
`;

const ProfileBox = styled.a`
  padding: 10px;
  /* border: 2px solid #496f4d; */
  border-bottom: none;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  justify-items: center;
  grid-column-gap: 20px;
  cursor: pointer;
`;

const SoldBox = styled.div`
  padding: 10px;
  /* border: 2px solid #496f4d; */
  border-bottom: none;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  justify-items: center;
  grid-column-gap: 20px;
  cursor: pointer;
`;

const FavBox = styled.div`
  padding: 10px;
  /* border: 2px solid #496f4d; */
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  justify-items: center;
  grid-column-gap: 20px;
  cursor: pointer;
`;

const Svg = styled(motion.svg)`
width: 25px;
height: 25px;
`;

const Profile: NextPage = () => {
  const router = useRouter();  
  const user = useUser();
  console.log(user);
  console.log(user?.profile?.avatar);  

  const onSoldClick = (id:number) => {
    router.push(
      {
        pathname: '/privacy/Sold',
        query: {
          id
        },
      },      
    );
  };

  const onLovedClick = (id:number) => {
    router.push(
      {
        pathname: '/privacy/Loved',
        query: {
          id
        },
      },      
    );
  };
  
  return (
    <Layout>
      <Head>
        <title>나의 정보</title>
      </Head>
    <Container>
      <ImgUsernameBox>  
        <div>
          {user?.profile?.avatar ? (
            <Img
              src={`https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/${user?.profile?.avatar}/avatar`}              
            />
          ) : (
            <div/>
          )}
        </div>
        <div>{user?.profile?.name}</div>
      </ImgUsernameBox>
        <div>
          <Link href="/privacy/Edit">            
            <ProfileBox>              
              <Svg 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </Svg>
              <div>Edit profile</div>
            </ProfileBox>
          </Link>
        </div>
      
      <div>
          <SoldBox onClick={() => onSoldClick(user?.profile?.id!)}>
            <Svg
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>              
            </Svg>
            <h1>판매 내역</h1>
          </SoldBox>
        <FavBox onClick={() => onLovedClick(user?.profile?.id!)}>
          <div>
            <Svg
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </Svg>
          </div>
          <div>관심목록</div>
        </FavBox>
      </div>
      <div>
        <div>
          <div />
          <div>
            <div>              
            </div>
          </div>
        </div>         
      </div>
    </Container>
    </Layout>
  );
};

export default Profile;