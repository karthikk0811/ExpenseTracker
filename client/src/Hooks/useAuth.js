import { useContext } from "react"
import UserContext from "../Context/UserProvider"

const useAuth=()=>{
    return useContext(UserContext);
}
 export default useAuth;