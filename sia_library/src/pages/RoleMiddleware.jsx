import React from 'react'
import { useAuth } from '../auth/AuthProvider'
import {Outlet, Navigate} from 'react-router-dom'
import NavBar from '../components/NavBar'

function RoleMiddleware({children}) {
    const { user } = useAuth();

    if (user.role_id === 3) {
        return children;
    } else {
        return <Navigate to="/" />
    }

}

export default RoleMiddleware