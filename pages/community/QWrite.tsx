import { Post } from '@prisma/client';
import type { NextPage } from "next";
import { useEffect, useState } from 'react';
import styled from "styled-components"
import { useRouter } from "next/router";

const Form = styled.form`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  justify-items: center;
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

interface Ipost {
  ok:boolean;
  post:Post;
}
const QWrite: NextPage = () => {
  const [postData, setPostData] = useState<Ipost>()
  const id = postData?.post.id
  const [data, setData] = useState("")
  const [uploadState , setUploadState] = useState(false); 
  const router = useRouter();
  console.log(data);  
   
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    console.timeLog(value);
    setData(value);
    // 유효성 검사 해야 함

  }

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();     
    fetch("/api/posts/Index", {
        method : "POST",
        body: JSON.stringify({
        "question" : data
         }),
        headers: {
          "Content-Type": "application/json"
         } // api를 호출 할 때마다 headers를 설정해야 한다.
       })
       .then((response) => response.json().catch(() => {})) //!!!!!!!!!
       .then((data) => setPostData(data)) 
       setUploadState(true)
  }

  useEffect(() => {
    if(uploadState === true) {
      router.push(`/community/${id}`);
    }
  }, [postData, router])

  return (
    <Form onSubmit={onSubmit}>
      <textarea onChange={onChange}        
        rows={4}
        placeholder="질문을 남겨 주세요"
      />
      <Button>
        Submit
      </Button>
    </Form>
  );
};

export default QWrite;