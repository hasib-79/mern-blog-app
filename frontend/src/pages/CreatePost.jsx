import { useEffect, useState } from 'react'
import Editor from '../components/Editor';
import { usePostStore } from '../store/usePostStore';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const CreatePost = () => {
	const { creatingPost, createPost, navigateToHomepage } = usePostStore();

	useEffect(() => {
		if (navigateToHomepage) {
			settitle('');
			setsummary('');
			setcontent('');
			setpostImg(null);
		}
	}, [navigateToHomepage])


	const [postImg, setpostImg] = useState(null);
	const [title, settitle] = useState('');
	const [summary, setsummary] = useState('');
	const [content, setcontent] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("postImg", postImg);
		formData.append("title", title);
		formData.append("summary", summary);
		formData.append("content", content);

		createPost(formData);
	}

	if (navigateToHomepage) {
		return (
			<Navigate to={'/'} />
		)
	}

	return (
		<form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-[10px] mb-24'>
			<input className='border-[2px] border-[#ddd] py-[5px] px-[7px] rounded-[5px]' type="text" value={title} onChange={(e) => { settitle(e.target.value) }} placeholder='Title' />
			<input className='border-[2px] border-[#ddd] py-[5px] px-[7px] rounded-[5px]' type="text" value={summary} onChange={(e) => { setsummary(e.target.value) }} placeholder='Summary' />
			<input className='border-[2px] border-[#ddd] py-[5px] px-[7px] rounded-[5px]' type="file" accept='image/*' onChange={(e) => { setpostImg(e.target.files[0]) }} />
			<Editor className='ql-editor' value={content} onChange={setcontent} />
			<button className=' bg-[#555] text-white border-none rounded-[5px] py-[7px]' type="submit">
				{creatingPost ? (
					<div className='flex items-center justify-center gap-1'>
						<Loader2 className='size-4 animate-spin' />
						Loading...
					</div>
				) : (
					'Create post')}
			</button>
		</form>
	)
}

export default CreatePost

