import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
        const response = await axios.post("https://weather-forecast-api-production.up.railway.app/user/register",{email,password,username});
        if(response.status === 200){
            navigate('/login');
        }
        }
        catch(err){
        console.log(err);
        }
    }

    return (
        <div className=" h-screen flex justify-center bg-white">
        <div className=' p-4 border-black border-solid border-2 border-opacity-50 rounded-md space-y-8 my-auto w-full max-w-sm h-[40rem]'>
            <h1 className='my-4 text-xl'>Welcome!</h1>
            <h2 className=' font-bold text-2xl'>Login</h2>
            <div className='flex flex-col gap-3'>
            <label htmlFor="Username" className=' text-lg font-semibold'>Username</label>
            <input type="Username" id="email" placeholder='Enter your Username' onChange={(e) => setUsername(e.target.value)} className='border-black border-2 rounded-md border-opacity-30 p-3 text-sm' />
            </div>
            <div className='flex flex-col gap-3'>
            <label htmlFor="email" className=' text-lg font-semibold'>Email</label>
            <input type="email" id="email" placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} className='border-black border-2 rounded-md border-opacity-30 p-3 text-sm' />
            </div>
            <div className='flex flex-col gap-3'>
            <label htmlFor="password" className=' text-lg font-semibold'>Password</label>
            <input type="password" id="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} className='border-black border-2 rounded-md border-opacity-30 p-3 text-sm' />
            </div>
            <button onClick={handleLogin} className='bg-black  text-white p-3 rounded-md w-full'>Login</button>
            <div className='text-[#7D7D7D] mx-auto'>Already have an Account? <a href="/login" className='text-black'>Log In</a></div>
        </div>  
        </div>

    )
    }

export default Register;