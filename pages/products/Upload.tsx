import { Product } from '@prisma/client';
import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useEffect,  useState } from 'react';
import { useForm } from "react-hook-form";
import styled from "styled-components"
import useMutation from '../../libs/client/useMutation';
import Head from 'next/head'

const Container = styled.div`
  /* border: 1px solid black; */
  padding: 100px;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 20px;
`;

const FormContainer = styled.form`
  padding: 10px;
  /* border: 1px solid black; */
  background-color: rgba(225, 225, 225, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);  
`;

const ProfileImgBox = styled.div`
  padding: 10px;
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
`;

const Label = styled.label`
  display: grid;
  justify-content: center;
  justify-items: center;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const InputDataBox = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  justify-items: center;  
  /* grid-row-gap: 10px; */
`;

const Button = styled.button`
position: relative;
width: 100px;
height: 25px;
color: #ffffff;
background-color: #496f4d;
border: 0;
outline: 0;
`;

const Svg = styled.svg`
width: 250px;
height: 250px;
`;

const Input = styled.input`
position: relative;
margin: 5px;
width: 200px;
height: 40px;
font-size: 15px;
/* color: #ffffff; */
/* background-color: #7eca8b; */
/* border: 0;
outline: 0; */
border: 2px solid #496f4d;
border-radius: 5px;
outline-color: #2e732d;
`;

const Textarea = styled.textarea`
  border: 5px solid #496f4d;
  border-radius: 10px;
  margin-bottom: 20px;
  /* width: 450px; */
  height: 100px;
  padding: 10px;
  resize: none;
  position: relative;
  /* top: 20px; */
  outline-color: #2e732d;
`;

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  photo: FileList;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  console.log(register, handleSubmit, watch);
  const [uploadProduct, { loading, data }] =
    useMutation<UploadProductMutation>("/api/products/Index");
  const onValid = async ({ name, price, description }: UploadProductForm) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", photo[0], name);
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
      uploadProduct({ name, price, description, photoId: id });
    } else {
      uploadProduct({ name, price, description });
    }
  };
  console.log(data?.product?.id)
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/products/${data?.product?.id}`);
    }
  }, [data, router]);
  const photo = watch("photo");
  const [photoPreview, setPhotoPreview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    }
  }, [photo]);
  return (
    <Container>
      <Head>
        <title>상품 등록하기</title>
      </Head>
      <FormContainer onSubmit={handleSubmit(onValid)}>
        <ProfileImgBox>
          {photoPreview ? (
            <Img
              src={photoPreview}
            />
          ) : (
            <Label>
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
              <FileInput
                {...register("photo")}
                accept="image/*"
                type="file"
              />
            </Label>
          )}
        </ProfileImgBox>
        <InputDataBox>
          <Input
            {...register("name", { required: true })}
            required  
            placeholder='상품의 이름을 입력 해주세요!'        
            name="name"
            type="text"
          />
          <Input
            {...register("price", { required: true })}
            placeholder='가격을 입력 해주세요!'
            required
            name="price"
            type="number"
          ></Input>
          <Textarea
            {...register("description", { required: true })}
            name="description"          
            required
          />
          <Button value={loading ? "Loading..." : "Upload item"}>업로드</Button>
        </InputDataBox>
      </FormContainer>
    </Container>
  );
};

export default Upload;