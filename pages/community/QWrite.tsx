import { Post } from '@prisma/client';
import type { NextPage } from "next";
import { useEffect, useState } from 'react';
import styled from "styled-components"
import { useRouter } from "next/router";
import Head from "next/head"

const Form = styled.form`
  display: grid;
  padding: 100px;
  margin: 50px;
  grid-template-columns: auto;
  justify-content: center;
  justify-items: center;
  background-color: rgba(225, 225, 225, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  
`;

const Textarea = styled.textarea`
  border: 2px solid #496f4d;
  border-radius : 10px;
  width: 450px;
  height: 100px;
  padding: 10px;
  resize: none;
  position: relative;
  outline-color:  #496f4d;
  margin: 5px;
`;

const Button = styled.button`
  position: relative;
  width: 80px;
  height: 25px;
  color: #ffffff;
  background-color:  #496f4d;
  border: 0;
  outline: 0;
  cursor: pointer;
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
    <>
    <Head>
      <title>질문 올리기</title>
    </Head>
    <Form onSubmit={onSubmit}>
      <Textarea onChange={onChange}        
        rows={4}
        placeholder="질문을 남겨 주세요"
      />
      <Button>
        Submit
      </Button>
    </Form>
    </>
  );
};

export default QWrite;