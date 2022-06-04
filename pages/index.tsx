import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from "styled-components"
import Layout from '../components/Layout'
import useUser from '../libs/client/useUser'
import { useRouter } from "next/router";
import useSWR from 'swr'
import { Product } from '@prisma/client'

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
z-index: 1;
`;

interface ProductsResponse {
  ok:boolean;
  products: Product[]
}

const Home: NextPage = () => {
  const {user, isLoading} = useUser(); 
  const { data } = useSWR<ProductsResponse>("/api/products/Index")
  console.log(data); 
  console.log(user);
  const router = useRouter();
  const onClick = (id:number) => {
    router.push(
      {
        pathname: '/products/Upload',
        query: {
          id
        },
      },
      
    );
  };
  return (
   <Layout title="홈" hasTabBar>
    <Head><title>Home</title></Head> 
      <Container>
      {data?.products?.map((product) => (
        <ItemListBox key={product.id}>          
          <ItemBox>  
            <ImgBox></ImgBox>
            <InfoBox>
              <h3>{product.name}</h3> 
              <div>{product.price}</div>        
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
          onClick={()=> onClick(user.id)}
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
   </Layout>
  );
}

export default Home
