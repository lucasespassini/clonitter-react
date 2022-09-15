import { Avatar, Container, Skeleton, Button } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styles from './PerfilPage.module.css'
import PostLoader from '../../components/Loading/PostLoader'
import Post from '../../components/Post/Post'
import { api } from '../../services/api'
import Navbar from '../../components/Navbar/Navbar'
import BottomNavbar from '../../components/Navbar/BottomNavbar'
import { AuthContext } from '../../contexts/auth'
import EditModal from '../../components/Modal/EditModal/EditModal'

export default function PerfilPage() {
  const { user } = useContext(AuthContext)
  const { user_name } = useParams()
  const { pathname } = useLocation()
  const [userProfile, setUserProfile] = useState({
    user_name: 'name',
    name: 'firstname',
    posts: [],
  })
  const [numberFollowers, setNumberFollowers] = useState(0)
  const [followers, setFollowers] = useState([])
  const [numberFollowings, setNumberFollowings] = useState(0)
  const [followings, setFollowings] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const [taSeguindo, setTaSeguindo] = useState(false)

  const width = window.screen.width

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await api.get(`/user/user_name/${user_name}`)
        setNumberFollowers(data.followers[1])
        setFollowers(data.followers[0])
        setNumberFollowings(data.followings[1])
        setFollowings(data.followings[0])
        setUserProfile(data.user)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [user_name, user])

  useEffect(() => {
    for (const follower of followers) {
      if (follower.user.id === user.sub) {
        setTaSeguindo(true)
        return
      } else {
        setTaSeguindo(false)
      }
    }
  }, [followers, user])

  async function seguir() {
    try {
      const { data } = await api.post('friendship', {
        followingId: userProfile.id,
        user: user.sub,
      })
      setFollowers(f => [data, ...f])
      setNumberFollowers(f => f + 1)
      setTaSeguindo(true)
    } catch (error) {
      console.log(error)
    }
  }

  async function deixarDeSeguir() {
    try {
      const f = followers.find(follower => follower.user.id === user.sub)
      await api.delete(`friendship/${f.id}`)
      setNumberFollowers(f => f - 1)
      setTaSeguindo(false)
    } catch (error) {
      console.log(error)
    }
  }

  function log() {
    console.log(followings)
  }

  return (
    <>
      <Navbar />
      <BottomNavbar />

      <Container maxW="650" padding="0">
        <Skeleton
          className={styles.bgContainer}
          isLoaded={isLoaded}
          fadeDuration={0.3}
          borderRadius={5}
        >
          <Avatar
            className={styles.bgImage}
            width="100%"
            height={width < 500 ? '200' : '250'}
            borderRadius={5}
            src="https://via.placeholder.com/500x250"
          />
        </Skeleton>

        <div className={styles.imageContainer}>
          <Skeleton isLoaded={isLoaded} fadeDuration={0.3} borderRadius={999}>
            <Avatar
              w={32}
              h={32}
              border="1px solid #0A0C10"
              borderRadius={999}
              src={
                userProfile.profile_image &&
                `${process.env.REACT_APP_BASE_URL}/uploads/profile_image/${userProfile.profile_image}`
              }
            />
          </Skeleton>
          <Skeleton isLoaded={isLoaded} fadeDuration={0.3} borderRadius={5}>
            {pathname === `/${user.user_name}` ? (
              <EditModal />
            ) : taSeguindo ? (
              <Button
                colorScheme="messenger"
                borderRadius={5}
                onClick={deixarDeSeguir}
              >
                Deixar de seguir
              </Button>
            ) : (
              <Button colorScheme="messenger" borderRadius={5} onClick={seguir}>
                Seguir
              </Button>
            )}
          </Skeleton>
        </div>

        <div className={styles.infoContainer}>
          <Skeleton isLoaded={isLoaded} fadeDuration={0.3}>
            <h2>
              <strong>{userProfile.name}</strong>
            </h2>
          </Skeleton>

          <Skeleton isLoaded={isLoaded} fadeDuration={0.3} marginTop={0.9}>
            <h1>
              <small>@{userProfile.user_name}</small>
            </h1>
          </Skeleton>
        </div>

        <div className={styles.profileInfoContainer}>
          <Skeleton onClick={log} isLoaded={isLoaded} fadeDuration={0.3}>
            <p>
              <strong>{numberFollowings}</strong> seguindo
            </p>
          </Skeleton>

          <Skeleton isLoaded={isLoaded} fadeDuration={0.3}>
            <p>
              <strong>{numberFollowers}</strong> seguidores
            </p>
          </Skeleton>

          <Skeleton isLoaded={isLoaded} fadeDuration={0.3}>
            <p>
              <strong>{userProfile.posts.length}</strong> tweets
            </p>
          </Skeleton>
        </div>

        {isLoaded ? (
          userProfile.posts.map(post => (
            <Post
              key={post.id}
              uuid={post.uuid}
              content={post.content}
              likes={post.likes}
              createdAt={post.createdAt}
              comments={post.comments}
              user={userProfile}
            />
          ))
        ) : (
          <PostLoader />
        )}
      </Container>
    </>
  )
}
