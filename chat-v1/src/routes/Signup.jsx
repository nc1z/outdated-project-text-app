import React from 'react';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../firebase';
import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BsSoundwave } from 'react-icons/bs';

const Signup = () => {

  // Display Image Name Uploaded 

  const [submit, setSubmit] = useState(false)

  const handleClick = (e) => {
    if(e.target.files[0]) {
    setSubmit(true)} else {
      setSubmit(false)
    }
  }

  // Display Loading Symbol
  const [loading, setLoading] = useState(false)

  // AUTH + STORAGE + DATABASE

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Storing each form input value into the const(s), which will be used as Auth, Storage, Database below
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // AUTHENTICATION: Creating Email and Password for User in Firebase Auth
      const response = await createUserWithEmailAndPassword(auth, email, password);

      // STORAGE: Reference for the file to be uploaded will be 2nd argument. In this case, it's the username.
      const storageRef = ref(storage, username);

      // STORAGE: Uploading file to storage, and naming it storageRef
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // UPDATING PROFILE
            await updateProfile(response.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            // CREATING DATABASE - USER INFO
            await setDoc(doc(db, "users", response.user?.uid), {
              uid: response.user?.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
            // CREATING DATABASE - USER CHATS
            await setDoc(doc(db, "userChats", response.user?.uid), {});
            // Redirect
            if (response.user?.uid) {
              navigate('/')
            };
          } catch(error) {
            console.log(error.message);
            setError(error.message);
            setLoading(false);
          }
        });
      });

    } catch(error) {
        setError(error.message);
        console.log(error.message);
        setLoading(false)
      };
  }

  // Render

  return (
    <div className='flex items-center justify-center h-screen bg-primary bg-alt bg-no-repeat bg-cover'>
        <div className='rounded-div flex flex-col bg-grayBlue py-8 px-4 md:px-16 text-primary rounded-lg gap-[10px] text-center border-none'>
            <div className='flex items-center justify-center gap-2'>
              <BsSoundwave className='text-secondary text-2xl'/>
              <h1 className='relative text-secondary text-2xl font-bold uppercase'>WaveText</h1>
            </div>
            <span className='text-base text-white/80'>Register</span>
            {error ? (<span className='w-80 bg-red-400 text-white italic text-sm py-1'>{error}</span>) : null}
            <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
                <input className='w-80 p-4 bg-lightBlue border-b border-primary text-white focus:outline-none placeholder:text-light' type="text" placeholder='Username'/>
                <input className='w-80 p-4 bg-lightBlue border-b border-primary text-white focus:outline-none placeholder:text-light' type="email" placeholder='Email'/>
                <input className='w-80 p-4 bg-lightBlue border-b border-primary text-white focus:outline-none placeholder:text-light' type="password" placeholder='Password'/>
                <label htmlFor="file" className='flex items-center gap-2 cursor-pointer text-left text-sm italic text-white/80 hover:scale-105'>
                    <MdAddPhotoAlternate className='text-2xl'/>
                    <span>Add a profile picture</span> 
                </label>
                {submit 
                ? <input onChange={handleClick} className='w-80 text-sm text-white/80' type="file" id='file'/>
                : <input onChange={handleClick} className='w-80 hidden' type="file" id='file'/>}
                <button className='bg-secondary text-secondary my-2 px-4 py-2 rounded-lg shadow-md 
                font-bold hover:bg-darkBlue hover:shadow-sm hover:scale-95'>Sign Up{loading ? <AiOutlineLoading3Quarters className='inline animate-spin mx-2'/> : null }</button>
            </form>
            <p className='mt-2 text-white/70'>Already have an account? <Link to='/Signin' className='text-white/70 underline hover:text-white'> Sign in</Link></p>
        </div>
    </div>
  )
}

export default Signup