import axios from "axios"
import { Avatar, Container, Skeleton, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from './Perfil.module.css'
import PostLoader from "../../components/Loading/PostLoader";
import PostComp from "../../components/Post/Post";

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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImZlZTViYWY2LTc2NzUtNDVmOC1iZWMzLTY1MjZjODg2MDI2MCIsInByb2ZpbGVfaW1hZ2UiOiIxN2IxMmNkMi1mNTQ2LTRjNDQtOWNlNS01N2Y2NGY4MDNhODAtbWFzc2FnZW0uanBnIiwidXNlcl9uYW1lIjoibWVuZGVzIiwibmFtZSI6Ikx1Y2FzIE1lbmRlcyIsImVtYWlsIjoibHVjYXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkYk1yZlV2dTd6Z2xYby9aN29pY3VzZXBKWDh0bHFuYU1ZTnh2THdFVm5VUlBJbFNBbXBiZmEiLCJpYXQiOjE2NjE1NzU4ODMsImV4cCI6MTY2MTc0ODY4M30.HdRN9YpjSEKxXlE4FOpVzqU0vCi2aazU9OGtZtlnyAk`,
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
            className={styles.profile_image}
            src={'http://localhost:3000/uploads/profile_image/' + user.profile_image}
            name={user.user_name + '-icon'}
          />
        </Skeleton>
        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={1}
          borderRadius={8}
        >
          <Button backgroundColor={'#1A8CD8'}>Seguir</Button>
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
          <PostComp
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