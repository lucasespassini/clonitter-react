import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import Post from "../../components/Post/Post";
import axios from 'axios'
import PostLoader from "../../components/Loading/PostLoader";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      const req = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXVpZCI6IjkzMDQ1MjYzLTQ3N2MtNDE3My1hZGM5LWUxNzFjMTljMWUwZiIsInByb2ZpbGVfaW1hZ2UiOiJjYzdkM2VlYi0wMzAyLTQ0NjgtYTg2MS0xZDViNmE4MWQ2OGQtZm90by5qcGciLCJ1c2VyX25hbWUiOiJtZW5kZXMiLCJuYW1lIjoiTHVjYXMgTWVuZGVzIiwiZW1haWwiOiJsdWNhc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRqYWtrYU9tOW05bVdZMXFWeVA0aS9POGtQSEJZcTJhbllQZC9Dd0Rhd1RzaS9MUUVKRmhtYSIsImlhdCI6MTY2MTg3NDExOSwiZXhwIjoxNjYyMDQ2OTE5fQ.HSnpI5yXMZL1LZeo15pJFyP1d0aFCU75OvJXsGaitYw`,
        },
      };
      try {
        const res = await axios
          .get('http://localhost:3000/post/user/1/following', req)
        setPosts(res.data)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  return (
    <Container maxW='650'>
      {isLoaded ?
        posts.map(post =>
          <Post
            key={post.id}
            uuid={post.uuid}
            content={post.content}
            likes={post.likes}
            createdAt={post.createdAt}
            comments={post.comments}
            user={post.user}
          />
        ) : <PostLoader />
      }
    </Container>
  );
}