import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

interface ProfileResponse {
  ok: boolean;
  profile: User
}

//*********다시 로그인 창으로 넘어 가도록 설정 해야 함

const fetcher = (url: string) => fetch(url).then((response) => response.json());

export default function useUser() {
   const {data, error} = useSWR<ProfileResponse>("/api/users/Me", fetcher);
   const router = useRouter();
   return data;
}

// export default function useUser() {
//    const [user, setUser] = useState();
//    const router = useRouter();
//    useEffect(() => {
//     fetch("/api/users/Me")
//       .then((response) => response.json())
//       .then(data => {
//           if(!data.ok) {
//               return router.push("/Login")
//           }
//           setUser(data.profile)
//       })
//    }, [router])
//    return user;
// }