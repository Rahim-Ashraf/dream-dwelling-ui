import axios from "axios";
import { useRouter } from "next/navigation";

const axiosSecure = axios.create({
    baseURL: "https://dream-dwellings-server.vercel.app"
})
const useAxiosSecure = () => {
    const router = useRouter()
    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = token;
        return config;
    }, error => {
        return Promise.reject(error);
    });


    // intercepts 401 and 403 status
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            router.push('/signin')
        }
        return Promise.reject(error);
    })


    return axiosSecure
};

export default useAxiosSecure;