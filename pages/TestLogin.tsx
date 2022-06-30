import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from "styled-components"

const TestLogin = () => {
    const [sign , setSign] = useState(true);
    const [tokenData, setTokenData] = useState<string | undefined>("")
    const [tokenRouter, setTokenRouter] = useState(false);
    const router = useRouter();     
  
  const onTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    const data:ObjectConstructor = Object.assign({ "token" : value })
    console.log(data)
    setTokenData(data);    
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    const data:ObjectConstructor = Object.assign({ "email" : value })
    console.log(data);
  };  

   const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {   
     //클릭하면 false -> true로 전환 되며    
     //true 가 되면 창이 열리는 방식으로 
    e.preventDefault();
    console.log(tokenData);
    if(tokenData !== "") {
      fetch("/api/users/Confirm", {
         method : "POST",
         body: JSON.stringify(tokenData),
         headers: {
           "Content-Type": "application/json"
         } // api를 호출 할 때마다 headers를 설정해야 한다.
       })
       setTokenRouter(true);
    }
    // if(email !== "") {
    //   fetch("/api/users/Login", {
    //     method : "POST",
    //     body: JSON.stringify(email),
    //     headers: {
    //       "Content-Type": "application/json"
    //     } // api를 호출 할 때마다 headers를 설정해야 한다.
    //   })
    //   setMailTokenInput(true);
    //   setTokenBtn(true)
    // }    
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
            <div>email</div>
            <input onChange={onTokenChange}
                type='email'
                />
            <button>get login confirm</button>    
            
            <form onSubmit={onSubmit}>    
                <div>token number</div>
                <input type='number'></input>            
            
                <div>전화번호</div>
                <input type='number'></input>
            
                <div>이름</div>
                <input type='text'></input>
            
                <div>비밀번호</div>
                <input type='text'></input>
            
                <div>비밀번호 확인</div>
                <input type='text'></input>
                <button>submit</button>
                <div onClick={() => setSign(true)}>sign in</div>
            </form>
            </>
        }
        </>
    )
}

export default TestLogin;