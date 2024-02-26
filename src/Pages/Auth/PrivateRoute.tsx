import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    return (
        (Cookies.get('token') ? <Outlet/> : <Navigate to='/login'/>
    )
    )
}

export default PrivateRoutes;