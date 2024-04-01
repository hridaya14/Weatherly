import { useRecoilState } from 'recoil';
import {  userAuthStatus } from '../../atoms/index';
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';


const PrivateRoutes = () => {
    const [auth, setAuth ]= useRecoilState(userAuthStatus);
    const navigate = useNavigate();
    useEffect(() => {
      const token = Cookies.get('token');
      if (token) {setAuth(true)}
      if (!auth) {
        navigate('/login');
      }
      }, [auth, navigate]);
    
      if (!auth) {
        return null;
      }
    return <Outlet/>; 
}

export default PrivateRoutes;
