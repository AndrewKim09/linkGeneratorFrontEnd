import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = ({setGlobalUser}) => {
    const [data, setData] = useState({username: '', password: ''});
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();


    const checkUser = async (e) => {
        e.preventDefault();
        if(!loading){

          try {
              setLoading(true);
              const response = await axios.post('https://linkgeneratorbackend.fly.dev/api/v1/users/login', data)
                  if (response.status === 200){
                      setGlobalUser(response.data);
                      navigate('/files');
                  }
                  else if(response.status === 404){
                      setUsernameError('Username does not exist');
                  }
                  else if(response.status === 401){
                      setPasswordError('Password is incorrect');
                  }
          } catch (error) {
              console.error('Error fetching file data:', error);
          }
          setLoading(false);
        }
    }


  return (
    <div>
         <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div
            className="w-auto h-10 mx-auto chainImage"
            alt="Your Company"
          />
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label className="flex text-sm font-medium leading-6 text-gray-900">
                username
                <span className="mt-auto ml-auto text-xs text-red-500">{usernameError}</span>
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  onChange={(e) => setData({...data, username: e.target.value})}
                  className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="flex text-sm font-medium leading-6 text-gray-900">
                  Password
                    <span className="mt-auto ml-auto text-xs text-red-500">{passwordError}</span>
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange = {(e) => setData({...data, password: e.target.value})}
                  className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick = {checkUser}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-4 text-sm text-center text-gray-500">
            <a href="signUp" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              SignUp here
            </a>

            <a href="#" className="ml-5 font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
          </p>
        </div>
      </div>
    </div>
  )
}
