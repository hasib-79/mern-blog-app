import cloudinary from '../lib/cloudinary.js'
import Post from '../models/postModel.js'

export const createPost = async (req, res) => {
	try {
		const { title, summary, content, author } = req.body;

		const postImg = req.file;

		if (!title || !summary || !content) {
			return res.status(400).json({ message: 'All fields are required' });
		}
		if (!postImg) {
			return res.status(400).json({ message: 'Image is not provided' });
		}

		const uploadResponse = await cloudinary.uploader.upload(postImg.path, { resource_type: 'image' });

		const newPost = new Post({
			author,
			title,
			summary,
			content,
			postImg: uploadResponse.secure_url
		})

		if (newPost) {
			await newPost.save();
			res.status(201).json(newPost);
		} else {
			return res.status(400).json({ message: 'Unable to create Post' });
		}
	} catch (error) {
		console.log('Error in createPost controller', error.message);
		res.status(500).json({ message: 'Internal server error' });
	}
}

export const updatePost = async (req, res) => {
	try {
		const { title, summary, content } = req.body;
		const postImg = req.file;

		if (!title || !summary || !content) {
			return res.status(400).json({ message: 'All fields are required' });
		}
		if (!postImg) {
			return res.status(400).json({ message: 'Image is not provided' });
		}

		const { id: postId } = req.params;

		const uploadResponse = await cloudinary.uploader.upload(postImg.path, { resource_type: 'image' });

		const updatedPost = await Post.findByIdAndUpdate(
			postId,
			{
				title,
				summary,
				content,
				postImg: uploadResponse.secure_url
			},
			{ new: true });
		if (updatedPost) {
			res.status(200).json(updatedPost);
		} else {
			return res.status(400).json({ message: 'Unable to update the post' });
		}

	} catch (error) {
		console.log('Error in updatePost controller', error.message);
		res.status(500).json({ message: 'Internal server error' });
	}
}

export const fetchPosts = async (req, res) => {
	try {
		const allPosts = await Post.find({});
		if (allPosts?.length > 0) {
			const reversedPosts = allPosts.reverse();
			res.status(200).json(reversedPosts);
		}
	} catch (error) {
		console.log('Error in fetchPosts controller', error.message);
		res.status(500).json({ message: 'Internal server error' });
	}
}

export const fetchPostWithId = async (req, res) => {
	try {
		const { id: postId } = req.params;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		res.status(200).json(post);
	} catch (error) {
		console.log('Error in fetchPostWithId controller', error.message);
		res.status(500).json({ message: 'Internal server error' });
	}
}