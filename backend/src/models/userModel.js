import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, minlength: 4 },
	password: { type: String, required: true, minlength: 6 }
})

const userModel = mongoose.model('User', userSchema);

export default userModel;