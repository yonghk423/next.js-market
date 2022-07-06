import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from "react";
import styled from "styled-components"
import { motion } from "framer-motion";

const Svg = styled(motion.svg)`
  width: 100px;
  height: 100px;
  position: relative;
  left: 10px;
  background-color: hsla(0, 0%, 88.23529411764706%, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const myVars = {
  start: { scale: 0 },
  end: { scale : 1, rotateZ: 360, transition: { type: "spring", delay: 0.5 } }
}

const Container = styled.div`
  padding: 50px;
  border: 1px solid black;
  margin: 100px;
`;

const ContainerSub = styled.div` 
  box-shadow: 10px 15px 25px 0 rgba(0, 0, 0, 0.5); 
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 20px;
`;

const TitleBox = styled.div`
  padding: 10px;
  margin: 10px;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  justify-items: center;
  background-color: rgba(225, 225, 225, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const MainTitle = styled.div`
  /* border: 1px solid black; */
  font-size: 50px;  
  text-align: center;
`;

const EmailInput = styled.input`
position: relative;
width: 200px;
height: 30px;
font-size: 15px;
/* color: #ffffff; */
/* background-color: #7eca8b; */
/* border: 0;
outline: 0; */
outline-color: #2e732d;
`;

const LoginLinkBtn = styled.button`
position: relative;
width: 200px;
height: 30px;
font-size: 15px;
/* color: #ffffff; */
border-radius: 5px;
background-color: #7eca8b;
border: 0;
outline: 0;
outline-color: #2e732d;
cursor: pointer;
`;

const TokenInput = styled.input`
position: relative;
width: 200px;
height: 30px;
font-size: 15px;
/* color: #ffffff; */
/* background-color: #7eca8b; */
/* border: 0;
outline: 0; */
outline-color: #2e732d;
`;

const SubmitBtn = styled.button`
position: relative;
width: 200px;
height: 30px;
font-size: 15px;
/* color: #ffffff; */
border-radius: 5px;
background-color: #7eca8b;
border: 0;
outline: 0;
outline-color: #2e732d;
`;

const FormBox = styled.form`
  /* border: 1px solid black; */
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
`;

export default function Login() { 
  const [mailTokenInput, setMailTokenInput] = useState(false);
  const [tokenData, setTokenData] = useState<string | undefined>("")
  const [tokenBtn, setTokenBtn] = useState(false);
  const [tokenRouter, setTokenRouter] = useState(false);
  const [method, setMethod] = useState<"email">("email");
  const [email, setEmail] = useState("");
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
    setEmail(data);
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
    if(email !== "") {
      fetch("/api/users/Login", {
        method : "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-Type": "application/json"
        } // api를 호출 할 때마다 headers를 설정해야 한다.
      })
      setMailTokenInput(true);
      setTokenBtn(true)
      setEmail("")
    }   
}

useEffect(() => {
    if(tokenRouter === true) {
      router.push("/");
    }
  }, [tokenRouter, router])

  return (
    <Container>     
      <ContainerSub>
        <TitleBox>
          <MainTitle>Welcome to baechu Market</MainTitle>  
          <Svg variants={myVars} initial="start" animate="end"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </Svg>
        </TitleBox>
        <FormBox onSubmit={onSubmit}>        
          <div>          
            <div>              
              <EmailInput 
                type="email"
                onChange={onEmailChange}
                placeholder="Email"
                required
                />
            </div>       
                {
                  mailTokenInput ?
                  (<TokenInput 
                    name="token"                    
                    placeholder='email token..'
                    type="number"
                    required
                    onChange={onTokenChange}
                    />
                    ) : null
                }
            </div>         
          { tokenBtn && <SubmitBtn>submit</SubmitBtn> }   
          { !tokenBtn &&      
          <LoginLinkBtn>            
            {method === "email" ? "Get login link" : null}            
          </LoginLinkBtn>    
          }
          <div>테스트 이메일</div>
          <div>yonghk423@naver.com</div>
          <div>테스트 token number</div>
          <div>791868</div>                 
        </FormBox>        
      </ContainerSub>    
    </Container>
  );
}