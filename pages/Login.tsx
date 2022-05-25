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

const FormBox = styled.div`
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
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => setMethod("email");
  const onPhoneClick = () => setMethod("phone");
  return (
    <Container>
      <MainTitle>Welcome to baechu Market</MainTitle>
      <ContainerSub>
        <EmailPhoneBtnBox>
            <LoginBtn onClick={onEmailClick}>Email</LoginBtn>
            <LoginBtn onClick={onPhoneClick}>Phone</LoginBtn>
        </EmailPhoneBtnBox>
        <FormBox>
          <label>
            {method === "email" ? "Email address" : null}
            {method === "phone" ? "Phone number" : null}
          </label>
          <div>
            {method === "email" ? <input type="email" required /> : null}
            {method === "phone" ? (
              <div>
                <span>+82</span>
                <input type="number" required />
              </div>
            ) : null}
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