import { Avatar, Container, Skeleton, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './PerfilPage.module.css'
import PostLoader from '../../components/Loading/PostLoader'
import Post from '../../components/Post/Post'
import { api } from '../../services/api'

export default function PerfilPage() {
  const { user_name } = useParams()
  const [user, setUser] = useState({
    user_name: 'name',
    name: 'firstname',
    posts: [],
  })
  const [followers, setFollowers] = useState(0)
  const [followings, setFollowings] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function getUser() {
      try {
        const res = await api.get(`/user/user_name/${user_name}`)
        setFollowers(res.data.followers)
        setFollowings(res.data.followings)
        setUser(res.data.user)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [user_name])

  return (
    <Container maxW="650">
      <Skeleton isLoaded={isLoaded} fadeDuration={1} borderRadius={10}>
        <Avatar
          width={'full'}
          height={250}
          borderRadius={10}
          src="https://via.placeholder.com/500x250"
          alt={'bg-image-' + user.user_name}
        />
      </Skeleton>

      <div className={styles.imageContainer}>
        <Skeleton isLoaded={isLoaded} fadeDuration={1} borderRadius={999}>
          <Avatar
            w={32}
            h={32}
            borderRadius={999}
            src={
              'http://localhost:3000/uploads/profile_image/' +
              user.profile_image
            }
            name={user.user_name + '-icon'}
          />
        </Skeleton>
        <Skeleton isLoaded={isLoaded} fadeDuration={1} borderRadius={8}>
          <Button _hover={false} backgroundColor={'#3178c6'}>
            Seguir
          </Button>
        </Skeleton>
      </div>

      <div className={styles.infoContainer}>
        <Skeleton isLoaded={isLoaded} fadeDuration={2}>
          <h2>
            <strong>{user.name}</strong>
          </h2>
        </Skeleton>

        <Skeleton isLoaded={isLoaded} fadeDuration={2} marginTop={0.9}>
          <h1>
            <small>@{user.user_name}</small>
          </h1>
        </Skeleton>
      </div>

      <div className={styles.profileInfoContainer}>
        <Skeleton isLoaded={isLoaded} fadeDuration={2}>
          <p>
            <strong>{followings}</strong> seguindo
          </p>
        </Skeleton>

        <Skeleton isLoaded={isLoaded} fadeDuration={2}>
          <p>
            <strong>{followers}</strong> seguidores
          </p>
        </Skeleton>

        <Skeleton isLoaded={isLoaded} fadeDuration={2}>
          <p>
            <strong>{user.posts.length}</strong> tweets
          </p>
        </Skeleton>
      </div>

      {isLoaded ? (
        user.posts.map(post => (
          <Post
            key={post.id}
            uuid={post.uuid}
            content={post.content}
            likes={post.likes}
            createdAt={post.createdAt}
            comments={[]}
            user={user}
          />
        ))
      ) : (
        <PostLoader />
      )}
    </Container>
  )
}
