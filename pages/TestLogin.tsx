import React, { useState, useEffect } from 'react';
import useSWR, { SWRConfig } from 'swr'
import { useRouter } from 'next/router';
import styled from "styled-components"

const TestLogin = () => {
    const [postTokenData , setPostTokenData] = useState<string | undefined>("")
    console.log(postTokenData);
    const [sign , setSign] = useState(true);
    const [mailTokenInput, setMailTokenInput] = useState(false);
    const [numberTokenInput , setNumberTokenInput] = useState(false)    
    const [tokenRouter, setTokenRouter] = useState(false);
    const [tokenBtn, setTokenBtn] = useState(false);
    const router = useRouter();     
    //-----------------------------------------------------
    //email / phone number / name / 비밀번호 
    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
  
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;    
    setEmail(value);
  };

  const onTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    const data:ObjectConstructor = Object.assign({ "token" : value })
    console.log(data)
    setPostTokenData(data);    
  }    

  const onPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);       
    setPhone(value);
  }    

  const onUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;    
    setName(value);
  }    
  const onLoginNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;   
    setPassword(value);        
  }    

  const onLoginConfirmNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;     
    setConfirmPassword(value);    
  }    
//------------------------------------------------------------
    const onEmailTokenSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch("/api/users/Login", {
         method : "POST",
         body: JSON.stringify("token value"),
         headers: {
           "Content-Type": "application/json"
         } // api를 호출 할 때마다 headers를 설정해야 한다.
       })
      .then((response) => response.json().catch(() => {})) //!!!!!!!!!
      .then((data) => setPostTokenData(data)) 
    }

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {   
    //  클릭하면 false -> true로 전환 되며    
    //  true 가 되면 창이 열리는 방식으로 
    e.preventDefault();
    console.log(postTokenData);
    if(postTokenData !== "") {
      fetch("/api/users/Confirm", {
         method : "POST",
         body: JSON.stringify(postTokenData),
         headers: {
           "Content-Type": "application/json"
         } // api를 호출 할 때마다 headers를 설정해야 한다.
       })
       setTokenRouter(true);
    }
    if(email !== "") {
      fetch("/api/users/Login", {
        method : "POST",
        body: JSON.stringify({
            email : email,
            // phone,
            name : name,
        }),
        headers: {
          "Content-Type": "application/json"
        } // api를 호출 할 때마다 headers를 설정해야 한다.
      })
      setMailTokenInput(true);
      setTokenBtn(true)
    }    
}

useEffect(() => {
    if(tokenRouter === true) {
      router.push("/");
    }
  }, [tokenRouter, router])

    return (
        <>
        { sign === true ?
        <form onSubmit={onSubmit}>
            <div>email</div>
            <input type='email'></input>
            <div>비밀번호</div>            
            <input type='text'></input>
            <button>확인</button>
            <div>아직 회원이 아니신가요?</div>
            <div onClick={() => setSign(false)}>sign up</div>
        </form>
        :       
            <>
            <form onSubmit={onEmailTokenSubmit}>
                <div>email</div>
                <input onChange={onEmailChange} type='email'/>
                <button>get login confirm</button>    
            </form>    

            <form onSubmit={onSubmit}>    
                <div>token number</div>
                <input onChange={onTokenChange} type='number'/>
                
                <div>전화번호</div>
                <input onChange={onPhoneNumberChange} type='number'></input>
            
                <div>이름</div>
                <input onChange={onUserNameChange} type='text'></input>
            
                <div>비밀번호</div>
                <input onChange={onLoginNumberChange} type='text'></input>
            
                <div>비밀번호 확인</div>
                <input onChange={onLoginConfirmNumber} type='text'></input>
                <button>submit</button>
                
                <div onClick={() => setSign(true)}>sign in</div>
            </form>
            </>
        }
        </>
    )
}

export default TestLogin;