import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuthStore } from '../store/useAuthStore'

const SignUpPage = () => {
	const { signup, isSigningUp } = useAuthStore();

	const [formData, setformData] = useState({
		username: '',
		password: ''
	})

	const validateForm = () => {
		if (!formData.username.trim()) return toast.error('Username is required');
		if (!formData.password.trim()) return toast.error('Password is required');
		if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');

		return true;
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const success = validateForm();
		if (success === true) {
			signup(formData);
		}
	}

	return (
		<form className='mt-12 max-w-[50%] mx-auto flex flex-col gap-2' onSubmit={handleSubmit}>
			<span className='text-center font-bold text-3xl mb-6'>Signup</span>
			<input className='border-[2px] border-[#ddd] rounded-md px-2 py-[5px]' onChange={e => setformData({ ...formData, username: e.target.value })} type="text" value={formData.username} placeholder='username' />
			<input className='border-[2px] border-[#ddd] rounded-md px-2 py-[5px]' onChange={e => setformData({ ...formData, password: e.target.value })} type="password" value={formData.password} placeholder='password' />
			<button className='bg-[#555] rounded-[5px] border-[2px] border-[#ddd] px-2 py-[5px] text-white' type="submit">{isSigningUp ? (
				<div className='flex items-center justify-center gap-1'>
					<Loader2 className='size-4 animate-spin' />
					Loading...
				</div>
			) : 'Signup'}</button>
		</form>
	)
}

export default SignUpPage
