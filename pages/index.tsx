import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from "styled-components"
import Layout from '../components/Layout'
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from 'swr'
import { Product } from '@prisma/client'
import useUser from '../libs/client/useUser'
import client from "../libs/server/client"
import { motion } from "framer-motion"

const Container = styled.div`  
  padding: 10px;
`;
const ItemListBox = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-between;
  background-color: rgba(225, 225, 225, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const ImgBox = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: gray;
  cursor: pointer;
`
const ItemBox = styled.div`
  padding: 5px;
  display: grid;
  grid-template-columns: auto auto;
  cursor: pointer;
`;
const InfoBox = styled.div`
padding: 10px;
font-weight: bold;
`;
const StateImgBox = styled.div`
padding: 5px;
`;

const FavBox = styled.div`
  display: grid;
`;

const FavCount = styled.div`
  position: relative;
  left: 8px;
`;


const BtnBox = styled.div`
`;

const Svg = styled.svg`
width: 25px;
height: 25px;
`;

const BtnSvg = styled(motion.svg)`
background-color: #496f4d;
color: white;
border-radius: 100px;
width: 50px;
height: 50px;
position: fixed;
bottom: 20px;
right: 30px;
cursor: pointer;
z-index: 1;
box-shadow: 10px 15px 25px 0 rgba(0, 0, 0, 0.5);
`;

interface ProductWithCount extends Product {
  _count: {
    favs: number;
  }
}

interface ProductsResponse {
  ok:boolean;
  products: ProductWithCount[]
}

const Home: NextPage = () => {
  const user = useUser()
  console.log(user);
  const { data } = useSWR<ProductsResponse>("/api/products/Index")
  console.log(data); 
  const fetcher = (url: string) => fetch(url).then((response) => response.json());
  const { data:profile } = useSWR("/api/users/Me", fetcher); 
  const router = useRouter();
  const onBtnClick = (id:number) => {
    router.push(
      {
        pathname: '/products/Upload',
        query: {
          id
        },
      },      
    );
  };

  const onProductClick = (id:number) => {
    router.push(
      {
        pathname: `/products/${id}`,
        query: {
          id
        },
      },
      
    );
  }
  return (
   <Layout title="홈" hasTabBar>
    <Head><title>홈</title></Head> 
      <Container>
      {data?.products?.map((product) => (
        <ItemListBox key={product.id}>          
          <ItemBox onClick={() => onProductClick(product?.id)}>  
            <ImgBox
             src={`https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/${product?.image}/public`} //Variants 다시 공부           
             alt=""
            />
            <InfoBox>
              <h3>{product?.name}</h3> 
              <div>₩{product?.price}</div>                      
            </InfoBox>            
          </ItemBox>
          <StateImgBox>
            <FavBox>
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
              <FavCount>{product._count?.favs}</FavCount>
            </FavBox>
            <div>
              {/* <Svg
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
              <div>1</div> */}
            </div>
          </StateImgBox>
        </ItemListBox>
      ))}
      <BtnBox>
        <BtnSvg
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={()=> onBtnClick(profile?.profile?.id)}
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

const Page:NextPage<{products:ProductWithCount[]}> = ({ products }) => {
  return <SWRConfig value={{
    fallback: {
      "api/products/Index" : {
        ok:true,
        products
      }
    }
  }}>
    <Home/>
  </SWRConfig>
}
export async function getServerSideProps() {
  const products = await client.product.findMany({});
  console.log(products);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Page;