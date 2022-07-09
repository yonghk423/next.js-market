import type { NextPage } from "next";
import styled from "styled-components"
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { Product, User } from '@prisma/client';
import Image from 'next/image';
import Head from 'next/head'

const Container = styled.div`
  padding: 50px;
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  font-weight: bold;
  `;

const SubContainer = styled.div`
  background-color: rgba(225, 225, 225, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`; 

const MainBox = styled.div`
/* border: 1px solid black; */
margin: 5px;
display: grid;
`;

const MainImg = styled(Image)`
  /* border: 1px solid black;   */
  /* background-color: #75a475; 
  width: 380px;
  height: 380px; */
  border-radius: 10px;

`;

const MainInfoBox = styled.div`
/* border: 1px solid black; */
border-bottom: none;
margin: 5px;
`;

const ProfileImg = styled(Image)`
/* border: 1px solid black; */
border-radius: 50px;
`;

const MainInfoDetailBox = styled.div`
  /* border: 1px solid black; */
  border-bottom: none;
  margin: 5px;
`;

const AddInfoBox = styled.div`
  /* border: 1px solid black; */
  margin: 5px;
`;

const AddInfoDetailBox = styled.div`
  border: 1px solid black;
  margin: 5px;
`;

const AddInfoDetailImg = styled.div`
  padding: 50px;
  border: 1px solid black;
  margin: 5px;
`;

const Button = styled.button`
  border: 0;
  outline: 0; 
  margin: 5px;
  background-color: rgba(225, 225, 225, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Svg = styled.svg`
width: 25px;
height: 25px;
border: 0;
outline: 0;
`;

//---!!!
interface ProductWithUser extends Product {
  user:User;
}

interface ItemDetailResponse {
  ok:boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter()
  const { data, mutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  console.log(data);

  const onFavClick = () => {
    fetch(`/api/products/${router.query.id}/fav`, {
        method : "POST",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json"
         } // api를 호출 할 때마다 headers를 설정해야 한다.
       })
    if(!data) return
    mutate({...data, isLiked: !data.isLiked }, false )
  }
  console.log(data?.product?.user?.avatar);
  return (
    <Container>
      <Head>
        <title>상품 정보</title>
      </Head>
      <SubContainer>
      <MainBox>         
        <MainImg 
          width={380}
          height={380}
          src={`https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/${data?.product?.image}/public`} //Variants 다시 공부           
          alt=""
          />       
        <MainInfoBox> 
        <ProfileImg
          width={50}
          height={50}
          src={`https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/${data?.product?.user?.avatar}/avatar`}   
          alt=""
          />        
        <div>
          <p>{data?.product?.user?.name}</p>
          {/* <Link href={`/users/profiles/${data?.product?.user?.id}`}> */}
          <a>View profile &rarr;</a>
          {/* </Link> */}
        </div>
        </MainInfoBox>
      </MainBox>  
      <MainInfoDetailBox>       
        <h1>{data?.product?.name}</h1>
        <p>{data?.product?.price}원</p>
        <p>{data?.product?.description}</p>
        <div>
          {/* <button>Talk to seller</button> */}
          <Button 
            onClick={onFavClick} 
            style={ data?.isLiked ? { color:'red'} : {color : 'white'} }
            >
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
          </Button>
        </div>
        </MainInfoDetailBox>      
        <AddInfoBox>
        <h2>Similar items</h2>
        <div>
          {data?.relatedProducts?.map((product) => (
            <AddInfoDetailBox key={product.id}>
              <AddInfoDetailImg/>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </AddInfoDetailBox>
          ))}
        </div>
        </AddInfoBox>
        </SubContainer>
    </Container>
  );
};

export default ItemDetail;