import { Product } from '@prisma/client';
import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import useMutation from "../../libs/client/useMutation"

interface UploadDataType {
  product: Product
}

// interface UploadProductMutation {
//   ok: boolean;
//   product: Product;
// }

import styled from "styled-components"

const Svg = styled.svg`
width: 250px;
height: 250px;
`;

const FileInput = styled.input`
  display: none;
`;

const Upload: NextPage = () => {
  const router = useRouter()  
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [uploadState , setUploadState] = useState(false);
  
  
  const onNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {  
    const { value } = e.target
    setName(value)
}
  const onPriceChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    const { value } = e.target
    setPrice(value);
  }

  const onDescriptionChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setDescription(value);
  }
// const [uploadProduct, { loading, data }] =
//     useMutation("/api/products");
  
//   useEffect(() => {
//     if (data?.ok) {
//       router.push(`/products/${data.product.id}`);
//     }
//   }, [data, router]);


  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();     
    fetch("/api/products/Index", {
        method : "POST",
        body: JSON.stringify({
        "name" : name,
        "price": price,
        "description" : description,
         }),
        headers: {
          "Content-Type": "application/json"
         } // api를 호출 할 때마다 headers를 설정해야 한다.
       })    
    setUploadState(true)
  }

  return (
    <div>
      <div>
        <div>
          <label>
            <Svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <FileInput type="file" />
          </label>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <div>Name</div>
          <input onChange={onNameChange} type="text"/>
        </div>
        <div>
          <div>Price</div>
          <div>
            <div>
              <div>$</div>
            </div>
            <input onChange={onPriceChange} type="number" placeholder="0.00" />
            <div>
              <div>USD</div>
            </div>
          </div>
        </div>
        <div>
          <div>Description</div>
          <div>
            <textarea rows={4}  onChange={onDescriptionChange}/>
          </div>
        </div>
        <button>Upload product</button>
      </form>
    </div>
    
  );
};

export default Upload;