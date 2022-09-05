import { Container, Skeleton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostLoader from '../../components/Loading/PostLoader'
import BottomNavbar from '../../components/Navbar/BottomNavbar'
import Navbar from '../../components/Navbar/Navbar'
import Post from '../../components/Post/Post'
import { api } from '../../services/api'

export default function PostPage() {
  const { uuid } = useParams()
  const [post, setPost] = useState({
    id: 0,
    uuid: uuid,
    content: '',
    likes: 0,
    createdAt: '',
    comments: [],
    user: {},
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function getPost() {
      try {
        const res = await api.get(`/post/uuid/${uuid}`)
        setPost(res.data)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [uuid])

  return (
    <>
      <Navbar />
      <BottomNavbar />
      <Container marginX={'auto'}>
        {
          <Skeleton isLoaded={isLoaded} fadeDuration={1} borderRadius={10}>
            <Post
              uuid={post.uuid}
              content={post.content}
              likes={post.likes}
              createdAt={post.createdAt}
              comments={post.comments}
              user={post.user}
            />
          </Skeleton>
        }
        {isLoaded ? (
          post.comments.map(comment => (
            <Post
              key={comment.id}
              uuid={''}
              content={comment.content}
              likes={comment.likes}
              createdAt={comment.createdAt}
              comments={[]}
              user={comment.user}
            />
          ))
        ) : (
          <PostLoader />
        )}
      </Container>
    </>
  )
}
