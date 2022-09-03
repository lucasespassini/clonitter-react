import { useEffect, useState, useContext } from 'react'
import { Container } from '@chakra-ui/react'
import Post from '../../components/Post/Post'
import PostLoader from '../../components/Loading/PostLoader'

import { api } from '../../services/api'
import { AuthContext } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { logout, user } = useContext(AuthContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await api.get(`/post/user/${user.sub}/following`)

        setPosts(data)
        setIsLoaded(true)
      } catch (error) {
        // console.log(error)
        if (error.response.status === 401) {
          navigate('/login')
        }
      }
    }
    getPosts()
  }, [navigate, user])

  return (
    <Container maxW="650">
      <button onClick={logout}>Sair</button>
      {isLoaded ? (
        posts.map(post => (
          <Post
            key={post.id}
            uuid={post.uuid}
            content={post.content}
            likes={post.likes}
            createdAt={post.createdAt}
            comments={post.comments}
            user={post.user}
          />
        ))
      ) : (
        <PostLoader />
      )}
    </Container>
  )
}
