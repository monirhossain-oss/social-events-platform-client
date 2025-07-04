import axios from 'axios';

const axiosSecure =axios.create({
    baseURL:`https://socail-events-server.vercel.app/`
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;