import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function useUser() {
    const [user, setUser] = useState();
    const router = useRouter();
    useEffect(() => {
        fetch("api/users/Me")
        .then((response) => response.json())
        .then((data) => {
            if(!data.ok) {
                return router.replace("/Login")
            }
            setUser(data.profile);
        })
    }, [router])
    return user;
}