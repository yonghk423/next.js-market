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
    <div>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
            />
          ) : (
            <div/>
          )}
          <label
            htmlFor="picture"          
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <input
          {...register("name")}
          required={false}          
          name="name"
          type="text"
        />
        <input
          {...register("email")}
          required={false}          
          name="email"
          type="email"
        />
        <input
          {...register("phone")}
          required={false}          
          name="phone"
          type="text"
        />
        {errors.formErrors ? (
          <div className="my-2 text-red-500 font-medium text-center block">
            {errors.formErrors.message}
          </div>
        ) : null}
        <button value={loading ? "Loading..." : "Update profile"} >업로드</button>
      </form>
    </div>
  );
};

export default EditProfile;