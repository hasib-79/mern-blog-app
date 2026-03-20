import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
	{
		author: { type: String, required: true },
		title: { type: String, required: true },
		summary: { type: String, required: true },
		content: { type: String, required: true },
		postImg: { type: String, required: true },
	},
	{ timestamps: true }
)

const postModel = mongoose.model('Post', postSchema);

export default postModel;