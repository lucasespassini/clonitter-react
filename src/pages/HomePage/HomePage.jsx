import { useEffect, useState, useContext } from 'react'
import { Container } from '@chakra-ui/react'
import Post from '../../components/Post/Post'
import PostLoader from '../../components/Loading/PostLoader'

import { api } from '../../services/api'
import { AuthContext } from '../../contexts/auth'

export default function HomePage() {
  const { logout, user } = useContext(AuthContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await api.get(`/post/user/${user.sub}/following`)
        setPosts(res.data)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [user])

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
