import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

export const SignUp = ({setGlobalUser, setActivateNotification}) => {
	const[data, setData] = useState({username: '', password: ''})
	const [error, setError] = useState('')
	const [disabled, setDisabled] = useState(false)
	const navigate = useNavigate();

	var handleSubmit = async (e) => {
		e.preventDefault()
		if(!disabled)
		{	try {
				setDisabled(true)
				const response = await axios.post('http://localhost:8080/api/v1/users',qs.stringify(data)).then((response) => {
					if (response.status === 201){
						navigate('/')
					}
					else {
						setDisabled(false)
						setError('Username already exists')
					}
				})
				
			} catch (error) {
				setError('Username already exists')
			}}
			setDisabled(false);
	}

	useEffect(() => {
		setActivateNotification(false)
	}, [])

	return (
		<div>
			<div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div
						className="w-auto h-10 mx-auto chainImage"
						alt="Your Company"
					/>
					<div>
						<h2 className="relative mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
							<FontAwesomeIcon className='absolute left-0 top-[50%] translate-y-[-50%] cursor-pointer' icon={faArrowLeft} onClick={() => {window.location.href="/"}}/>
							<span>Sign Up an account</span>
						</h2>
					</div>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="space-y-6">
						<div>
							<label className="flex text-sm font-medium leading-6 text-gray-900 ">
								Username
								<span className='mt-auto ml-auto text-xs text-red-500 text-red'>{error}</span>
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="username"
									className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									onChange={(e) => setData({...data, username: e.target.value})}
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
									Password
								</label>
								<div className="text-sm">
									<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									onChange={(e) => setData({...data, password: e.target.value})}
									className="block w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								onClick={handleSubmit}
							>
								Sign Up
							</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}
