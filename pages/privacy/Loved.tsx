import type { NextPage } from "next";
import styled from "styled-components"
import useSWR from 'swr'
import { Product } from '@prisma/client'
import { useRouter } from "next/router";

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
const ImgBox = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: gray;
  cursor: pointer;
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

interface ProductWithCount extends Product {
  _count: {
    favs: number;
  }
}

interface ProductsResponse {
  ok:boolean;
  products: ProductWithCount[]
}


const Loved: NextPage = () => {
  const router = useRouter()
  const { data } = useSWR("/api/users/me/favs")
  console.log(data);

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
     <Container>
       {data?.favs?.map((fav:any) => (
        <ItemListBox key={fav.id}>          
          <ItemBox onClick={() => onProductClick(fav?.product?.id)}>  
            <ImgBox
             src={`https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/${fav?.product?.image}/public`} //Variants 다시 공부           
             alt=""
            />
            <InfoBox>
              <h3>{fav?.product?.name}</h3> 
              <div>₩{fav?.product?.price}</div>                      
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
              <div>{fav?.product._count?.favs}</div>
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
    </Container>    
  )
};

export default Loved;