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
  const [contentPost, setContentPost] = useContext('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      try {
        const { data } = await api.get(`/post/user/${user.sub}/following`)

        setPosts(data)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [user])

  useEffect(() => {
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
    postar()
  })

  return (
    <>
      <Navbar />
      <BottomNavbar />
      <div>
        <textarea
          onChange={e => setContentPost(e.target.value)}
          placeholder="Fala a boa?"
          cols="30"
          rows="10"
        />
        <Button type="submit">Postar</Button>
      </div>
      <Container maxW="650">
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
