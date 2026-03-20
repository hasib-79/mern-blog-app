import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from './useAuthStore';

export const usePostStore = create((set) => ({
	posts: [],
	navigateToHomepage: false,
	navigateToViewPostpage: false,
	creatingPost: false,
	updatingPost: false,
	postData: {},

	fetchPosts: async () => {
		try {
			const res = await axiosInstance.get('/post/all-posts');
			set({ posts: res.data });
		} catch (error) {
			console.log('Error in fetchPosts', error);
		}
	},

	createPost: async (data) => {
		set({ creatingPost: true });
		try {

			data.append("author", useAuthStore.getState().authUser.username);

			const res = await axiosInstance.post('/post/create', data);

			set((state) => ({ posts: [...state.posts, res.data] }));

			toast.success('Post created successfully');
			set({ navigateToHomepage: true });

		} catch (error) {
			console.log('Error in createPost', error);
			toast.error(error.response?.data?.message);
		} finally {
			set({ creatingPost: false });
		}
	},

	resetNavigation: () => {
		set({ navigateToHomepage: false });
		set({ navigateToViewPostpage: false });
	},

	fetchPost: async (id) => {
		try {
			const res = await axiosInstance.get(`/post/${id}`);
			set({ postData: res.data });
		} catch (error) {
			console.log('Error in fetchPost:', error);
		}
	},

	updatePost: async (data, id) => {
		set({ updatingPost: true });
		try {
			const res = await axiosInstance.put(`/post/update/${id}`, data);
			set(
				{
					postData: res.data,
					navigateToViewPostpage: true
				}
			);
			toast.success('Post updated successfully');
		} catch (error) {
			toast.error(error.response.data.message);
			console.log('Error in updatePost', error);
		} finally {
			set({ updatingPost: false });
		}
	}
}))