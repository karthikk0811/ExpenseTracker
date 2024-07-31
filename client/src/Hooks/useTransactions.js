import { useContext } from "react"
import TransactionContext from "../Context/TransactionProvider"

const useTransactions = ()=>{
    return useContext(TransactionContext);
}

export default  useTransactions;