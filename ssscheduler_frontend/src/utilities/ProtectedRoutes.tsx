import {Navigate, Outlet} from 'react-router-dom'
import {isAuthenticated} from "./AuthHelpers";

const ProtectedRoutes = () => {
    return (
        isAuthenticated() ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default ProtectedRoutes