import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

const LoginPage = () => {
	const { login, isLoggingIn } = useAuthStore();

	const [formData, setformData] = useState({
		username: '',
		password: ''
	})

	const handleSubmit = (e) => {
		e.preventDefault();

		login(formData);
	}

	return (
		<form className='mt-12 max-w-[50%] mx-auto flex flex-col gap-2' onSubmit={handleSubmit}>
			<span className='text-center font-bold text-3xl mb-6'>Login</span>
			<input className='border-[2px] border-[#ddd] rounded-md px-2 py-[5px]' onChange={e => setformData({ ...formData, username: e.target.value })} type="text" value={formData.username} placeholder='username' />
			<input className='border-[2px] border-[#ddd] rounded-md px-2 py-[5px]' onChange={e => setformData({ ...formData, password: e.target.value })} type="password" value={formData.password} placeholder='password' />
			<button className='bg-[#555] rounded-[5px] border-[2px] border-[#ddd] px-2 py-[5px] text-white' type="submit">{isLoggingIn ? (
				<div className='flex items-center justify-center gap-1'>
					<Loader2 className='size-4 animate-spin' />
					Loading...
				</div>
			) : 'Login'}</button>
		</form>
	)
}

export default LoginPage
