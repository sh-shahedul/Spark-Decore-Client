import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
const axiosSecure = axios.create({
    baseURL: 'https://spark-decoration.vercel.app'
})


const useAxiosSecure = () => {
    const {user,signOutUser} = useAuth()
    const navigate = useNavigate
   useEffect(()=>{
     //request interceptor
   const reqInterceptor = axiosSecure.interceptors.request.use(config=>{
     console.log(user?.accessToken);
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config 
    })
   
    //response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use((response) => {
        return  response
    }, 
    (error) =>{
   console.log(error);

   const statusCode = error.status;
    if(statusCode === 401 || statusCode ===403){
          signOutUser()
          .then(()=>{
            navigate('/login')
          })
    }
   return Promise.reject(error)
    })
     return () =>{
    axiosSecure.interceptors.request.eject(reqInterceptor)
    axiosSecure.interceptors.response.eject(resInterceptor)
     }
   },[user,signOutUser,navigate])
    return axiosSecure
};

export default useAxiosSecure;