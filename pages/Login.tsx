import Head from "next/head"
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from "react";
import styled from "styled-components"
import { motion } from "framer-motion";

//--------------------------------------------------------------------------------------------------------
const Container = styled.div`
  padding: 50px;
  /* border: 1px solid black; */
  margin: 100px;
  @media (max-width: 970px) {
  }  
`;

const ContainerSub = styled(motion.div)` 
  box-shadow: 10px 15px 25px 0 rgba(0, 0, 0, 0.5); 
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: 20px;
  border-radius: 10px;
  @media (max-width: 970px) {
    box-shadow: none;
    position: relative;
    left: -120px;
  }
`;

//--------------------------------------------------------------------------------------------------------
const TitleBox = styled.div`
  padding: 10px;
  margin: 20px;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  justify-items: center;
  background-color: rgba(225, 225, 225, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  @media (max-width: 970px) {
  position: relative;
  background-color: white;
  border-radius: 0;
  box-shadow: none;
  }
`;

const MainTitle = styled(motion.div)`
  position: relative;
  left: 40px;
  width: 400px;
  height: 100px;
  display: grid;
  line-height: 100px;
  grid-template-columns: auto auto auto auto;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  @media (max-width: 970px) {
  left: 10px;
  width: 390px;
  height: 80px;
  line-height: 80px;
  }
`;
const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
}

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
}

const Circle = styled(motion.div)`
  font-size: 25px;  
  font-weight: bold;
  text-align: center;
  place-self: center;
  @media (max-width: 970px) {
  font-size: 20px;  
  }
`;

const Svg = styled(motion.svg)`
  color: #29392b;
  width: 100px;
  height: 100px;
  position: relative;
  left: 50px;
  background-color: hsla(0, 0%, 88.23529411764706%, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  @media (max-width: 970px) {
  width: 70px;
  height: 80px;
  left: 10px;
  }
`;
const myVars = {
  start: { scale: 0 },
  end: { scale : 1, rotateZ: 360, transition: { type: "spring", delay: 0.5, damping:10 } }
  }

//-------------------------------------------------------------------------------------------------
const FormBox = styled.form`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
`;

const EmailInput = styled.input`
position: relative;
top: -10px;
width: 200px;
height: 30px;
font-size: 15px;
border: 2px solid #496f4d;
border-radius: 5px;
outline-color: #2e732d;
`;

const LoginLinkBtn = styled(motion.button)`
position: relative;
width: 200px;
height: 30px;
font-size: 15px;
border-radius: 5px;
background-color: #496f4d;
border: 0;
outline: 0;
outline-color: #496f4d;
cursor: pointer;
`;

const TokenInput = styled.input`
position: relative;
top: -10px;
width: 200px;
height: 30px;
font-size: 15px;
border-radius: 5px;
border: 2px solid #496f4d;
outline-color: #496f4d;
`;

const SubmitBtn = styled(motion.button)`
position: relative;
width: 200px;
height: 30px;
font-size: 15px;
border-radius: 5px;
background-color:#496f4d;
border: 0;
outline: 0;
outline-color: #496f4d;
cursor: pointer;
`;

const TextBox = styled.div`
  font-weight: bold;
  margin: 10px;
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
     //???????????? false -> true??? ?????? ??????    
     //true ??? ?????? ?????? ????????? ???????????? 
    e.preventDefault();
    console.log(tokenData);
    if(tokenData !== "") {
      fetch("/api/users/Confirm", {
         method : "POST",
         body: JSON.stringify(tokenData),
         headers: {
           "Content-Type": "application/json"
         } // api??? ?????? ??? ????????? headers??? ???????????? ??????.
       })
       setTokenRouter(true);
    }
    if(email !== "") {
      fetch("/api/users/Login", {
        method : "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-Type": "application/json"
        } // api??? ?????? ??? ????????? headers??? ???????????? ??????.
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
    <>
    <Head>
      <title>Login</title>
    </Head>
    <Container>     
      <ContainerSub>
        <TitleBox>
          <MainTitle variants={boxVariants} initial="start" animate="end">
            <Circle variants={circleVariants}>Welcome</Circle>
            <Circle variants={circleVariants}>to</Circle>
            <Circle variants={circleVariants}>baechu</Circle>
            <Circle variants={circleVariants}>Market</Circle>
          </MainTitle>  
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
          { tokenBtn && <SubmitBtn 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          submit</SubmitBtn> }   
          { !tokenBtn &&      
          <LoginLinkBtn
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          >            
            {method === "email" ? "Get login link" : null}            
          </LoginLinkBtn>    
          }
        <TextBox>  
          <div>test email</div>
          <div>yonghk423@naver.com</div>
          <div>test token number</div>
          <div>791868</div>
        </TextBox>                   
        </FormBox>        
      </ContainerSub>    
    </Container>
    </>
  );
  
}