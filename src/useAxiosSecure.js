import axios from 'axios';
import { useEffect } from 'react';

const axiosSecure = axios.create({
    baseURL: 'https://your-server-url',
    withCredentials: true // Cookie attach হবে
});

const useAxiosSecure = () => {
    useEffect(() => {
        // interceptors চাইলে এখানে future enhance করতে পারো
    }, []);

    return axiosSecure;
};

export default useAxiosSecure;
