import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Post from './components/Post'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import CreatePost from "./pages/CreatePost"
import ViewPost from "./pages/ViewPost"
import UpdatePost from "./pages/UpdatePost"
import { Loader } from 'lucide-react'
import { useAuthStore } from './store/useAuthStore'
import { usePostStore } from './store/usePostStore'

const App = () => {
  const { checkAuth, authUser, isCheckingAuth, navigateToHomepage, resetNavigation } = useAuthStore();
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, [])


  useEffect(() => {
    if (navigateToHomepage) resetNavigation();
  }, [navigateToHomepage])

  if (isCheckingAuth && !authUser) {
    return (
      <>
        <div className='flex justify-center items-center h-screen'>
          <Loader className='size-10 animate-spin' />
        </div>
      </>
    )
  }

  return (
    <div className='max-w-[72vw] mx-auto'>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? (
          <div className='flex flex-col gap-16 sm:gap-8 sm:mb-8 mb-16'>
            {posts?.map((post, index) => (
              <Post
                postId={post._id}
                author={post.author}
                key={post._id}
                postImg={post.postImg}
                title={post.title}
                summary={post.summary}
                createdAt={post.createdAt}
              />
            ))}
          </div>
        ) : (
          <Navigate to={'/login'} />
        )} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/create-post' element={authUser ? <CreatePost /> : <Navigate to={'/login'} />} />
        <Route path='/post/:postId' element={authUser ? <ViewPost /> : <Navigate to={'/login'} />} />
        <Route path='/post/update/:id' element={authUser ? <UpdatePost /> : <Navigate to={'/login'} />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
