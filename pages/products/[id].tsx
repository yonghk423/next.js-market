import type { NextPage } from "next";
import styled from "styled-components"
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import { Product, User } from '@prisma/client';

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
  return (
    <Container>
      <MainBox>
        <MainImg></MainImg>
        <MainInfoBox>
          <ProfileImg>
          </ProfileImg>          
          <div>
            <p>{data?.product?.user?.name}</p>
            <Link href={`/users/profiles/${data?.product?.user?.id}`}>
              <a>View profile &rarr;</a>
            </Link>
          </div>
        </MainInfoBox>
      </MainBox>  
        <MainInfoDetailBox>
          <h1>{data?.product?.name}</h1>
          <p>{data?.product?.price}</p>
          <p>{data?.product?.description}</p>
          <div>
            <button>Talk to seller</button>
            <button 
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
            </button>
          </div>
        </MainInfoDetailBox>      
      <AddInfoBox>
        <h2>Similar items</h2>
        <div>
          {/* {data?.relatedProducts.map((product) => (
            <AddInfoDetailBox key={product.id}>
              <AddInfoDetailImg/>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </AddInfoDetailBox>
          ))} */}
        </div>
      </AddInfoBox>
    </Container>
  );
};

export default ItemDetail;