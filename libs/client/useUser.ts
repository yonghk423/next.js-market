import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (url:string) => fetch(url).then((response) => response.json());
export default function useUser() {
    const {data, error} = useSWR("api/users/Me")
    // const [user, setUser] = useState();
    const router = useRouter(); 
    useEffect(() => {
      if (data && !data.ok) {
        router.replace("/Login")
      }        
    }, [data, router])
    // useEffect(() => {
    //     fetch("api/users/Me")
    //     .then((response) => response.json())
    //     .then((data) => {
    //         if(!data.ok) {
    //             return router.replace("/Login")
    //         }
    //         setUser(data.profile);
    //     })
    // }, [router])
    return { user: data?.profile, isLoading: !data && !error};
}