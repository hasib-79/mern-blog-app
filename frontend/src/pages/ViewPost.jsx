import { useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useParams } from 'react-router-dom'
import { usePostStore } from '../store/usePostStore';
import { useAuthStore } from '../store/useAuthStore';

const ViewPost = () => {
	const { postData, fetchPost, navigateToViewPostpage, resetNavigation } = usePostStore();
	const { authUser } = useAuthStore();

	const { postId } = useParams();

	useEffect(() => {
		fetchPost(postId);
	}, [postId])

	useEffect(() => {
		if (navigateToViewPostpage) resetNavigation();
	}, [navigateToViewPostpage])


	return (
		<div className='flex flex-col items-center gap-7'>
			<h1 className='mt-12 text-center font-bold text-3xl'>{postData?.title}</h1>
			<div className='flex flex-col items-center'>
				<time className="text-[#aaa] text-[.89rem]">{postData.createdAt?.split('T')[0]}</time>
				<div className='font-bold text-[.86rem] text-[#333]'>by @{postData.author}</div>
				{authUser?.username === postData.author && (
					<Link className='mt-2 flex gap-[6px] justify-center items-center rounded-[5px] py-[15px] px-[30px] bg-[#333] text-white' to={`/post/update/${postId}`}>
						<img className='invert w-5' src={assets.editIcon} alt="" />
						Edit this post
					</Link>
				)}
			</div>
			<img src={postData.postImg} alt="" />
			<div className='mt-8 mb-16 font-medium' dangerouslySetInnerHTML={{ __html: postData.content }} />
		</div>
	)
}

export default ViewPost
