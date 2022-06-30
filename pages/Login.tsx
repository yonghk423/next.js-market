import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from "react";
import styled from "styled-components"

const Container = styled.div`
  /* border: 1px solid black; */
  margin: 100px;
`;
const MainTitle = styled.div`
  border: 1px solid black;
  font-size: 50px;  
  text-align: center;
`;

const ContainerSub = styled.div` 
  box-shadow: 10px 15px 25px 0 rgba(0, 0, 0, 0.5); 
  /* border: 1px solid black; */
`;

const EmailPhoneBtnBox = styled.div`
  border: 1px solid black;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;  
`;

const LoginBtn = styled.button`
 border: 1px solid black;
 
`;

const FormBox = styled.form`
  border: 1px solid black;
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
`;

const SocialLoginBtnBox = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
`;

export default function Login() { 
  const [mailTokenInput, setMailTokenInput] = useState(false);
  const [numberTokenInput , setNumberTokenInput] = useState(false)
  const [tokenData, setTokenData] = useState<string | undefined>("")
  const [tokenBtn, setTokenBtn] = useState(false);
  const [tokenRouter, setTokenRouter] = useState(false);
  const [method, setMethod] = useState<"email" | "phone">("email");
  const router = useRouter(); 

  const onEmailClick = () => {
    setMethod("email");
    setNumberTokenInput(false)
    setTokenBtn(false)
  }
  const onPhoneClick = () => {
    setMethod("phone");
    setMailTokenInput(false)
    setTokenBtn(false)
  }

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); 
  
  const onTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    const data:ObjectConstructor = Object.assign({ "token" : value })
    console.log(data)
    setTokenData(data);    
  }

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    const data = Object.assign({ "phone" : value })
    console.log(data);
    setPhone(data)     
  };

  
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
    } else if(phone !== "") {
      fetch("/api/users/Login", {
        method : "POST",
        body: JSON.stringify(phone),
        headers: {
          "Content-Type": "application/json"
        }
      })    
      setNumberTokenInput(true)
      setTokenBtn(true)
    } else return;     
}

useEffect(() => {
    if(tokenRouter === true) {
      router.push("/");
    }
  }, [tokenRouter, router])

  return (
    <Container>
      <MainTitle>Welcome to baechu Market</MainTitle>
      <ContainerSub>
        <EmailPhoneBtnBox>
            <LoginBtn onClick={onEmailClick}>Email</LoginBtn>
            <LoginBtn onClick={onPhoneClick}>Phone</LoginBtn>
        </EmailPhoneBtnBox>
        <FormBox onSubmit={onSubmit}>
          <label>
            {method === "email" ? "Email address" : null}
            {method === "phone" ? "Phone number" : null}
          </label>
            <div>
            {method === "email" ?
            <div>              
              <input 
                // value={email}
                type="email"
                onChange={onEmailChange}
                placeholder="Email"
                required
                />
            </div>    
            : null}
                {
                  mailTokenInput ?
                  (<input 
                    name="token"                    
                    placeholder='email token..'
                    type="number"
                    required
                    onChange={onTokenChange}
                    />
                    ) : null
                }
            </div>
            
            <div>    
            {method === "phone" ?               
              <div>
                <input 
                  // value={number}
                  type="number"                   
                  onChange={onNumberChange}
                  placeholder="Phone Number"
                  required 
                  />
              </div>
             : null}
              {
                numberTokenInput ? 
                (<input
                  name="token" 
                  placeholder='number token..'
                  type="number"
                  required
                  onChange={onTokenChange}
                  />
                  ) : null
              }
          </div>
          { tokenBtn && <button>submit</button> }   
          { !tokenBtn &&      
          <button>            
            {method === "email" ? "Get login link" : null}
            {method === "phone" ? "Get one-time password" : null}
          </button>    
          }                 
        </FormBox>        
      </ContainerSub>    
    </Container>
  );
}