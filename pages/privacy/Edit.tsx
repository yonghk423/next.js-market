import type { NextPage } from "next";
import { useEffect } from 'react';
import { useState } from 'react';
import styled from "styled-components"
import useMutation from '../../libs/client/useMutation';
import useUser from '../../libs/client/useUser';
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Head from "next/head"

// 수정 해야 할 것들 
//disable 유효성 검사 해야 함
//post 요청 에러 Cannot set headers after they are sent to the client 데이터 바뀌고 있음 

const Container = styled.div`
  padding: 100px;
`;

const FormContainer = styled.form`
  padding: 10px;
  background-color: rgba(225, 225, 225, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  /* border: 1px solid black; */
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
`;

const Img = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 20px;
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

const Button = styled.button`
position: relative;
width: 100px;
height: 25px;
color: #ffffff;
background-color:  #496f4d;
border: 0;
outline: 0;
cursor: pointer;
`;

const Svg = styled.svg`
  width: 100px;
  height: 100px;
  cursor: pointer;
`

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const user = useUser();
  console.log(user)
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<EditProfileForm>();
  useEffect(() => {
    if (user?.profile?.name) setValue("name", user?.profile?.name);
    if (user?.profile?.email) setValue("email", user?.profile?.email);
    if (user?.profile?.phone) setValue("phone", user?.profile?.phone);
    if (user?.profile?.avatar)
      setAvatarPreview(
        `https://imagedelivery.net/KIkx1DioUEY-Y5COTODk1Q/${user?.profile?.avatar}/avatar`
      );
  }, [user, setValue]);
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>(`/api/users/me/Index`);
  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.profile?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      editProfile({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      editProfile({
        email,
        phone,
        name,
      });
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  return (
    <Container>
      <Head>
        <title>프로필 편집</title>
      </Head>
      <FormContainer onSubmit={handleSubmit(onValid)}>
        <ProfileImgBox>
          <Label
            htmlFor="picture"          
          >
          {avatarPreview ? (
            <Img src={avatarPreview}></Img>
          ) : (
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </Svg>
          )}        
            <FileInput
              {...register("avatar")}
              id="picture"
              type="file"
              accept="image/*"
            />
          </Label>
        </ProfileImgBox>
        <InputDataBox>
          <Input
            {...register("name")}
            placeholder='이름'
            required={false}          
            name="name"
            type="text"
          />
          <Input
            {...register("email")}          
            required={false}          
            name="email"
            type="email"
            placeholder='email'
          />
          <Input
            {...register("phone")}
            required={false}          
            name="phone"
            type="text"
            placeholder='phone number'
          />
          {errors.formErrors ? (
          <div>
            {errors.formErrors.message}
          </div>
        ) : null}
        <Button value={loading ? "Loading..." : "Update profile"} >업로드</Button>
        </InputDataBox>      
      </FormContainer>
    </Container>
  );
};

export default EditProfile;