import useAuth from './useAuth'
import axios from '../Api/axios';

export default function useLogout() {
    const { setUser } = useAuth();
    const logout = async ()=>{
        try{
            await axios.get('auth/logout');
            setUser({});
            
        }catch(error){
            console.error(error);
        }
    }
    return logout ;
}
