import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { BsSoundwave } from 'react-icons/bs';


const Signin = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Storing Form Input Values into Const
    const email = e.target[0].value
    const password = e.target[1].value

    // AUTHENTICATION: SIGN IN
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch(error) {
      setError(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className='flex items-center justify-center h-screen bg-primary bg-alt bg-no-repeat bg-cover'>
    <div className='rounded-div flex flex-col bg-grayBlue py-8 px-4 md:px-16 text-primary rounded-lg gap-[10px] text-center border-none'>
        <div className='flex items-center justify-center gap-2'>
          <BsSoundwave className='text-secondary text-2xl'/>
          <h1 className='relative text-secondary text-2xl font-bold uppercase'>WaveText</h1>
        </div>
        <span className='text-base text-white/80'>Login</span>
        {error ? (<span className='w-80 bg-red-400 text-white italic text-sm py-1'>{error}</span>) : null}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
            <input className='w-80 p-4 bg-lightBlue border-b border-primary text-white focus:outline-none placeholder:text-light' type="email" placeholder='Email'/>
            <input className='w-80 p-4 bg-lightBlue border-b border-primary text-white focus:outline-none placeholder:text-light' type="password" placeholder='Password'/>
            <button className='bg-secondary text-secondary my-2 px-4 py-2 rounded-lg shadow-md 
            font-bold hover:bg-darkBlue hover:shadow-sm hover:scale-95'>Sign In</button>
        </form>
        <p className='mt-2 text-white/70'>Don't have an account? <Link to='/Signup' className='text-white/70 underline hover:text-white'> Sign Up</Link></p>
    </div>
</div>
  )
}

export default Signin