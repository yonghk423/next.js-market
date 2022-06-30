import { Product } from '@prisma/client';
import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useEffect,  useState } from 'react';
import { useForm } from "react-hook-form";
import styled from "styled-components"
import useMutation from '../../libs/client/useMutation';

const Container = styled.div`
  border: 1px solid black;
  padding: 10px;
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 20px;
`;

const FormContainer = styled.form`
  padding: 10px;
  border: 1px solid black;
`;

const ProfileImgBox = styled.div`
  padding: 10px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
`;

const Label = styled.label`
  display: grid;
  justify-content: center;
  justify-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const InputDataBox = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  justify-items: center;  
  grid-row-gap: 20px;
`;

const Button = styled.button`
position: relative;
width: 100px;
height: 25px;
color: #ffffff;
background-color: #7eca8b;
border: 0;
outline: 0;
`;

const Svg = styled.svg`
width: 250px;
height: 250px;
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
        <input
          {...register("name", { required: true })}
          required          
          name="name"
          type="text"
        />
        <input
          {...register("price", { required: true })}
          required
          name="price"
          type="number"
        />
        <textarea
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