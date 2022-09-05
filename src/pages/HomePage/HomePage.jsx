import { useEffect, useState, useContext } from 'react'
import { Button, Container } from '@chakra-ui/react'
import Post from '../../components/Post/Post'
import PostLoader from '../../components/Loading/PostLoader'

import { api } from '../../services/api'
import { AuthContext } from '../../contexts/auth'
import Navbar from '../../components/Navbar/Navbar'
import BottomNavbar from '../../components/Navbar/BottomNavbar'

export default function HomePage() {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [contentPost, setContentPost] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function getPosts() {
      try {
        setIsLoaded(false)
        const { data } = await api.get(`/post/user/${user.sub}/following`)

        setPosts(data)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [user])

  async function postar() {
    try {
      await api.post(`/post`, {
        content: contentPost,
        user: user.sub,
      })

      const res = await api.get(`/post/user/${user.sub}/following`)
      setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Navbar />
      <BottomNavbar />
      <Container maxW="650">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea
            style={{ width: '100%' }}
            onChange={e => setContentPost(e.target.value)}
            placeholder="Fala a boa?"
          />
          <Button
            colorScheme="messenger"
            borderRadius={5}
            onClick={postar}
            type="submit"
          >
            Postar
          </Button>
        </div>
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
    </>
  )
}
