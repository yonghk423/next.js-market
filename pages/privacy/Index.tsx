// https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/<image_id>/public

import type { NextPage } from "next";
import styled from "styled-components"
import Layout from '../../components/Layout';
import useSWR from 'swr'
import Link from 'next/link';
import { useRouter } from "next/router";
import useUser from '../../libs/client/useUser';
import { User } from '@prisma/client';

const Svg = styled.svg`
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
    <div>
      <div>
        <div>
          {user?.profile?.avatar ? (
            <img
              src={`https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/${user?.profile?.avatar}/avatar`}              
            />
          ) : (
            <div/>
          )}
        </div>
        <div>
          <div>{user?.profile?.name}</div>
          <Link href="/privacy/Edit">
            <a><span>Edit profile &rarr;</span></a>
          </Link>
        </div>
      </div>
      <div>
        <div>
          <div>
            
          </div>
          <div onClick={() => onSoldClick(user?.profile?.id!)}>
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>              
            </Svg>
            <h1>판매 내역</h1>
          </div>
        </div>
        {/* <div>
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </Svg>
          </div>
          <span>구매내역</span>
        </div> */}
        <div onClick={() => onLovedClick(user?.profile?.id!)}>
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </Svg>
          </div>
          <div>관심목록</div>
        </div>
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
    </div>
    </Layout>
  );
};

export default Profile;