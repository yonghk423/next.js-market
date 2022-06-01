import { useState } from "react";
import styled from "styled-components"

const Container = styled.div`
    margin: 100px;
`;
const MainTitle = styled.div`
  font-size: 30px;  
  text-align: center;
`;

const ContainerSub = styled.div`
  
`;

const EmailPhoneBtnBox = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
  
  
  
`;

const LoginBtn = styled.button`
  
`;

const FormBox = styled.form`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
`;
const SocialLoginBox = styled.div`

`;
const SocialLoginTitile = styled.div`
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
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => {
    setMethod("email");
    setNumberTokenInput(false)
  }
  const onPhoneClick = () => {
    setMethod("phone");
    setMailTokenInput(false)
  }

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");  

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
    const data = Object.assign({ "email" : value })
    console.log(data);
    setEmail(data);
  };
  

   const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {   
     //클릭하면 false -> true로 전환 되며    
     //true 가 되면 창이 열리는 방식으로 
    e.preventDefault();
    if(email !== "") {
      fetch("/api/users/Login", {
        method : "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-Type": "application/json"
        } // api를 호출 할 때마다 headers를 설정해야 한다.
      })
      setMailTokenInput(true);
    } else if(phone !== "") {
      fetch("/api/users/Login", {
        method : "POST",
        body: JSON.stringify(phone),
        headers: {
          "Content-Type": "application/json"
        }
      })      
      setNumberTokenInput(true)
    } else return;     
}

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
              <input 
                // value={email}
                type="email"
                onChange={onEmailChange}
                placeholder="Email"
                required/>
                : null}
                {
                  mailTokenInput ? (<input placeholder='email token..'></input>) : null
                }
            </div>
            <div>    
            {method === "phone" ? (              
              <div>
                <span>+82</span>
                <input 
                  // value={number}
                  type="number"                   
                  onChange={onNumberChange}
                  placeholder="Phone Number"
                  required 
                  />
              </div>
            ) : null}
            {
              numberTokenInput ? (<input placeholder='number token..'></input>) : null
            }
          </div>
          <button>
            {method === "email" ? "Get login link" : null}
            {method === "phone" ? "Get one-time password" : null}
          </button>
        </FormBox>
        <SocialLoginBox>                      
          <SocialLoginTitile>
            <span>Social Login</span>
          </SocialLoginTitile>          
          <SocialLoginBtnBox>
            <button>Twitter</button>
            <button>GitHub</button>
          </SocialLoginBtnBox>
        </SocialLoginBox>
      </ContainerSub>
    </Container>
  );
}