import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        
        navigate('/files')

      }).catch((error) => {
        console.error('Google Login Error', error);
      });

  }

  return (
    <button 
      onClick={handleGoogleLogin}
      className='flex items-center justify-center w-1/2 h-10 text-sm font-bold bg-white border-2 border-gray-400 border-solid rounded-lg'
    >
      <img src={process.env.PUBLIC_URL + '/googleLogo.png'} alt="Google Logo" className='w-5 h-5 mr-2'/>
      Sign in with Google
    </button>
  )
}
