import { useEffect } from 'react';
import { axiosPrivate } from '../Api/axios';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

export default function useAxiosPrivate() {
    const refresh=useRefreshToken();
    const {user}=useAuth();
    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use((config)=>{
            if(!config.headers['Authorization']){
                config.headers['Authorization']=`Bearer ${user?.accessToken}`;
            }
            return config;
        },(error)=>{return Promise.reject(error)});

        const responseIntercept = axiosPrivate.interceptors.response.use((response)=>{
            return response;
        },async (error)=>{
            // console.log(error);
            const prevReq=error?.config;
            if(error?.response?.status===403 && !prevReq.sent){
                prevReq.sent=true;
                const accessToken=await refresh();
                prevReq.headers['Authorization']=`Bearer ${accessToken}`;
                return axiosPrivate(prevReq);
            }
            return Promise.reject(error);
        })

        return ()=>{
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    },[user,refresh])    
  return axiosPrivate;
}