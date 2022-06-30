import type { NextPage } from "next";
import { useEffect } from 'react';
import { useState } from 'react';
import styled from "styled-components"
import useMutation from '../../libs/client/useMutation';
import useUser from '../../libs/client/useUser';
import { useForm } from "react-hook-form";
// 수정 해야 할 것들 
//disable 유효성 검사 해야 함
//post 요청 에러 Cannot set headers after they are sent to the client 데이터 바뀌고 있음 

const Container = styled.div`
  border: 1px solid black;
  padding: 10px;
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
  width: 200px;
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
      <FormContainer onSubmit={handleSubmit(onValid)}>
        <ProfileImgBox>
          <Label
            htmlFor="picture"          
          >
          {avatarPreview ? (
            <Img src={avatarPreview}></Img>
          ) : (
            <div/>
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