import axios from "axios"
import { Avatar, Container, Skeleton, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from './PerfilPage.module.css'
import PostLoader from "../../components/Loading/PostLoader";
import Post from "../../components/Post/Post";

export default function Perfil() {
  const { user_name } = useParams()
  const [user, setUser] = useState({
    user_name: 'name',
    name: 'firstname',
    posts: []
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function getUser() {
      const req = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXVpZCI6IjkzMDQ1MjYzLTQ3N2MtNDE3My1hZGM5LWUxNzFjMTljMWUwZiIsInByb2ZpbGVfaW1hZ2UiOiJjYzdkM2VlYi0wMzAyLTQ0NjgtYTg2MS0xZDViNmE4MWQ2OGQtZm90by5qcGciLCJ1c2VyX25hbWUiOiJtZW5kZXMiLCJuYW1lIjoiTHVjYXMgTWVuZGVzIiwiZW1haWwiOiJsdWNhc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRqYWtrYU9tOW05bVdZMXFWeVA0aS9POGtQSEJZcTJhbllQZC9Dd0Rhd1RzaS9MUUVKRmhtYSIsImlhdCI6MTY2MTg3NDExOSwiZXhwIjoxNjYyMDQ2OTE5fQ.HSnpI5yXMZL1LZeo15pJFyP1d0aFCU75OvJXsGaitYw`,
        },
      };

      try {
        const res = await axios.get(`http://localhost:3000/user/user_name/${user_name}`, req)
        setUser(res.data)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [user_name])

  return (
    <Container>
      <Skeleton
        isLoaded={isLoaded}
        fadeDuration={1}
        borderRadius={10}
      >
        <Avatar
          width={'full'}
          height={250}
          borderRadius={10}
          src="https://via.placeholder.com/500x250"
          alt={'bg-image-' + user.user_name}
        />
      </Skeleton>


      <div className={styles.imageContainer}>
        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={1}
          borderRadius={999}
        >
          <Avatar
            w={32}
            h={32}
            borderRadius={999}
            src={'http://localhost:3000/uploads/profile_image/' + user.profile_image}
            name={user.user_name + '-icon'}
          />
        </Skeleton>
        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={1}
          borderRadius={8}
        >
          <Button _hover={false} backgroundColor={'#3178c6'}>Seguir</Button>
        </Skeleton>
      </div>

      <div className={styles.infoContainer}>
        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={2}
        >
          <h2><strong>{user.name}</strong></h2>
        </Skeleton>

        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={2}
          marginTop={.9}
        >
          <h1><small>@{user.user_name}</small></h1>
        </Skeleton>
      </div>

      <div className={styles.profileInfoContainer}>
        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={2}
        >
          <p><strong>0</strong> seguidores</p>
        </Skeleton>

        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={2}
        >
          <p><strong>0</strong> seguindo</p>
        </Skeleton>

        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={2}
        >
          <p><strong>{user.posts.length}</strong> tweets</p>
        </Skeleton>
      </div>

      {
        isLoaded ? user.posts.map(post => (
          <Post
            key={post.id}
            uuid={post.uuid}
            content={post.content}
            likes={post.likes}
            createdAt={post.createdAt}
            comments={[]}
            user={user}
          />)) : <PostLoader />
      }
    </Container>
  )
}