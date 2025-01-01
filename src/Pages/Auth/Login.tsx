import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { user, userAuthStatus } from '../../atoms/index';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUsername = useSetRecoilState(user);
  const [auth, setAuth] = useRecoilState(userAuthStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://weather-forecast-api-lo1h.onrender.com/user/login", { email, password });
      if (response.status === 200) {
        setUsername(response.data.username);
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        Cookies.set('token', response.data.token, {
          expires: expirationDate,
          sameSite: 'none',
          secure: true,
        });
        setAuth(true);
        navigate('/');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="h-screen flex justify-center bg-white ">
      <div className=' p-4 border-black border-solid border-2 border-opacity-50 rounded-md space-y-8 my-auto w-full max-w-sm h-[38rem]'>
        <h1 className='my-4 text-xl'>Welcome!</h1>
        <h2 className=' font-bold text-2xl'>Login</h2>
        <div className='flex flex-col gap-3'>
          <label htmlFor="email" className=' text-lg font-semibold'>Email</label>
          <input type="email" id="email" placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} className='border-black border-2 rounded-md border-opacity-30 p-3 text-sm' />
        </div>
        <div className='flex flex-col gap-3'>
          <label htmlFor="password" className=' text-lg font-semibold'>Password</label>
          <input type="password" id="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} className='border-black border-2 rounded-md border-opacity-30 p-3 text-sm' />
        </div>
        <button onClick={handleLogin} className='bg-black  text-white p-3 rounded-md w-full'>Login</button>
        <div className='text-[#7D7D7D] mx-auto'>Not Registered? <Link to="/register" className='text-black'>Sign Up</Link></div>
        
        {/* Test account details section */}
        <div className="text-center text-sm text-gray-600">
          <p>Test account details:</p>
          <p>Email: <strong>Test123@gmail.com</strong></p>
          <p>Password: <strong>Test12345678</strong></p>
        </div>
      </div>
    </div>
  )
}

export default Login;
