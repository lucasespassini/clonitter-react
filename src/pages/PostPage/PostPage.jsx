import { Button, Container, Skeleton, Textarea } from '@chakra-ui/react'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from '../../components/Comment/Comment'
import PostLoader from '../../components/Loading/PostLoader'
import BottomNavbar from '../../components/Navbar/BottomNavbar'
import Navbar from '../../components/Navbar/Navbar'
import Post from '../../components/Post/Post'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'

export default function PostPage() {
  const { user } = useContext(AuthContext)
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
  const [contentComment, setContentComment] = useState('')

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await api.get(`/post/uuid/${uuid}`)
        setPost(data)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [uuid])

  async function comentar() {
    if (contentComment.length < 1) {
      alert('Digite algo para comentar!')
    } else {
      try {
        await api.post('comment', {
          content: contentComment,
          post: post.id,
          user: user.sub,
        })
        setContentComment('')
        const res = await api.get(`/post/uuid/${uuid}`)
        setPost(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <Navbar />
      <BottomNavbar />
      <Container maxW="650" padding="0">
        {
          <Skeleton isLoaded={isLoaded} fadeDuration={0.3} borderRadius={10}>
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
            <Comment
              key={comment.id}
              content={comment.content}
              likes={comment.likes}
              createdAt={comment.createdAt}
              user={comment.user}
            />
          ))
        ) : (
          <PostLoader />
        )}
        <div
          style={{
            margin: '2rem 5%',
            paddingBottom: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Textarea
            height={100}
            placeholder="Twitte seu comentario"
            resize={'none'}
            value={contentComment}
            onChange={e => setContentComment(e.target.value)}
          />
          <Button
            colorScheme="messenger"
            marginTop={5}
            padding="5px 25px"
            borderRadius={999}
            onClick={comentar}
            type="submit"
          >
            Comentar
          </Button>
        </div>
      </Container>
    </>
  )
}
