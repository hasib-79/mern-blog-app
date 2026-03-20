import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
	const { authUser, logout } = useAuthStore();

	return (
		<nav className='flex justify-between items-center py-8 mb-4'>
			<Link className='font-bold text-xl' to={'/'}>MyBlog</Link>
			<div className='flex gap-4'>
				{authUser ? (
					<>
						<Link to={'/create-post'}>Create post</Link>
						<button onClick={() => {logout()}}>Logout</button>
					</>
				) : (
					<>
						<Link to={'/login'}>Login</Link>
						<Link to={'/signup'}>Signup</Link>
					</>
				)}
			</div>
		</nav >
	)
}

export default Navbar
