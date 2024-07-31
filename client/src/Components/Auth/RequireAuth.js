import React from 'react'
import useAuth from '../../Hooks/useAuth'
import { useLocation,Outlet,Navigate } from 'react-router-dom';
import { TransactionProvider } from '../../Context/TransactionProvider';

export default function RequireAuth() {
    const {user} = useAuth();
    const location = useLocation();
    return (
            user?.accessToken?
            <TransactionProvider>
                <Outlet/>
            </TransactionProvider>:<Navigate to='/login' state={{from:location}} replace={true} />
    );
}