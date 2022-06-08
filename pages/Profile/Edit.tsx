
import { User } from '@prisma/client';
import type { NextPage } from "next";
import { useEffect } from 'react';
import { useState } from 'react';
import styled from "styled-components"
import useUser from '../../libs/client/useUser';

// 수정 해야 할 것들 
//disable 유효성 검사 해야 함
//post 요청 에러 Cannot set headers after they are sent to the client 데이터 바뀌고 있음 

const Svg = styled.svg`
width: 25px;
height: 25px;
`;

const EditProfile: NextPage = () => {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  console.log(phone);
  const [data, setData] = useState("");
  const user = useUser()
  console.log(user);
  useEffect(() => {
    if(user?.profile?.email) setEmail(user?.profile?.email)
    if(user?.profile?.phone) setPhone(user?.profile?.phone)    
  } , [user])

  const onEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
  }

  const onPhoneChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target     
    setPhone(value);
  }

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    if(phone !== "") {
      fetch("/api/users/me/Index", {
        method : "POST",
        body: JSON.stringify({        
        "phone": phone,       
         }),
        headers: {
          "Content-Type": "application/json"
         } // api를 호출 할 때마다 headers를 설정해야 한다.
       })  
      } 
      //   else if(email !== "") {
      // fetch("/api/users/me/Index", {
      //   method : "POST",
      //   body: JSON.stringify({        
      //   "email": email,       
      //    }),
      //   headers: {
      //     "Content-Type": "application/json"
      //    } // api를 호출 할 때마다 headers를 설정해야 한다.
      //  })  
      // }
    }
    
    

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div/>
        <label
          htmlFor="picture"
        >
          Change
          <input id="picture" type="file" accept="image/*" />
        </label>
      </div>
      <div onChange={onEmailChange}>
        <label htmlFor="email">
          Email address
        </label>
        <input id="email" type="email" defaultValue={email}/>
      </div>
      <div onChange={onPhoneChange}>
        <label htmlFor="phone">
          Phone number
        </label>
        <div>
          <span>
            +82
          </span>
          <input id="input" type="number" defaultValue={phone}/>
        </div>
      </div>
      <button >
        Update profile
      </button>
    </form>
  );
};

export default EditProfile;