import { Navigate, useParams } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";
import { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { Loader2 } from "lucide-react";

const UpdatePost = () => {
	const { updatingPost, updatePost, navigateToViewPostpage } = usePostStore();

	const { id } = useParams();

	const { posts } = usePostStore();

	const [postImg, setpostImg] = useState(null);
	const [title, settitle] = useState('');
	const [summary, setsummary] = useState('');
	const [content, setcontent] = useState('');

	const post = posts?.find((post) => post._id === id);

	useEffect(() => {
		if (post) {
			settitle(post.title);
			setsummary(post.summary);
			setcontent(post.content);
		}
	}, [post])

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();

		formData.append('postImg', postImg);
		formData.append('title', title);
		formData.append('summary', summary);
		formData.append('content', content);

		updatePost(formData, id);
	}

	if (navigateToViewPostpage) {
		return <Navigate to={`/post/${id}`} />;
	}

	return (
		<form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-[10px] mb-24'>
			<input className='border-[2px] border-[#ddd] py-[5px] px-[7px] rounded-[5px]' type="text" value={title} onChange={(e) => { settitle(e.target.value) }} placeholder='Title' />
			<input className='border-[2px] border-[#ddd] py-[5px] px-[7px] rounded-[5px]' type="text" value={summary} onChange={(e) => { setsummary(e.target.value) }} placeholder='Summary' />
			<input className='border-[2px] border-[#ddd] py-[5px] px-[7px] rounded-[5px]' type="file" accept='image/*' onChange={(e) => { setpostImg(e.target.files[0]) }} />
			<Editor className='ql-editor' value={content} onChange={setcontent} />
			<button className=' bg-[#555] text-white border-none rounded-[5px] py-[7px]' type="submit">
				{updatingPost ? (
					<div className='flex items-center justify-center gap-1'>
						<Loader2 className='size-4 animate-spin' />
						Loading...
					</div>
				) : (
					'Update post')}
			</button>
		</form>
	)
}

export default UpdatePost
