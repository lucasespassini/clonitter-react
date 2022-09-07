import { useEffect, useState, useContext } from 'react'
import { Button, Container, Textarea } from '@chakra-ui/react'
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
  const [hiddenMenu, setHiddenMenu] = useState(false)

  const [lastScrollPosition, setLastScrollPosition] = useState(0)
  const [monitorScroll, setMonitorScroll] = useState(0)

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
      if (contentPost.length < 1) {
        alert('Digite alguma coisa para twittar')
      } else {
        const { data } = await api.post(`/post`, {
          content: contentPost,
          user: user.sub,
        })
        setPosts(posts => [data, ...posts])
        setContentPost('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  function rolar() {
    const html = document.querySelector('html')
    let scrollPosition = html.scrollTop

    if (scrollPosition === 0) {
      setHiddenMenu(false)
    } else if (lastScrollPosition < scrollPosition) {
      setHiddenMenu(true)
    } else if (lastScrollPosition === scrollPosition) {
      if (monitorScroll <= scrollPosition) {
        setHiddenMenu(true)
      } else {
        setHiddenMenu(false)
      }
      setMonitorScroll(scrollPosition)
    } else {
      setHiddenMenu(false)
    }

    console.log('Posição Atual: ', scrollPosition)
    console.log('Ultima Posição', lastScrollPosition)
    setLastScrollPosition(scrollPosition)
  }
  return (
    <>
      <Navbar />
      <BottomNavbar hidden={hiddenMenu} />
      <Container
        maxW="650"
        padding="0"
        onWheel={rolar}
        onTouchEnd={rolar}
        onTouchMove={rolar}
      >
        <div
          style={{
            display: 'flex',
            padding: '0 4%',
            flexDirection: 'column',
            borderBottom: '1px solid #7A828E',
          }}
        >
          <Textarea
            marginTop={'5'}
            height={120}
            placeholder="O que você está pensando?"
            resize={'none'}
            value={contentPost}
            onChange={e => setContentPost(e.target.value)}
          />
          <div
            style={{
              margin: '15px 20px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              colorScheme="messenger"
              padding="5px 25px"
              borderRadius={999}
              onClick={postar}
              type="submit"
            >
              Twittar
            </Button>
          </div>
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
