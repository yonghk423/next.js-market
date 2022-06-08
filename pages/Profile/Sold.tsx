import type { NextPage } from "next";
import styled from "styled-components"
import useSWR from 'swr'
import { Product } from '@prisma/client'
import { useRouter } from "next/router";

interface ProductWithCount extends Product {
  _count: {
    favs: number;
  }
}

interface ProductsResponse {
  ok:boolean;
  products: ProductWithCount[]
}

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

const Sold: NextPage = () => {
  const router = useRouter()
  console.log(router.query.id);
  const id = router.query.id
  const { data } = useSWR<ProductsResponse>("/api/products/Index")
  const productData = data?.products?.filter((product)=> (
    product.userId === +id!
  ))
  console.log(productData);
  console.log(data); 
  return (
    <div>      
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <div
          key={i}
        >
          <div>
            <div/>
            <div>
              <h3>
                New iPhone 14
              </h3>
              <span>Black</span>
              <span>$95</span>
            </div>
          </div>
          <div>
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
              <span>1</span>
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
              <span>1</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sold;