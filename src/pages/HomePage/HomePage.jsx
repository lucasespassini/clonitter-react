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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6IjBlY2FkY2ZiLTc0MzctNDYyNy05YmI5LTVlZTM5NjAwYTI5NiIsInByb2ZpbGVfaW1hZ2UiOiIwOTJkYjdkOS03MzQ1LTRiNDItYjJhZS04ZjJjMGQwYWEwMDUtZm90by5qcGciLCJ1c2VyX25hbWUiOiJtZW5kZXMiLCJuYW1lIjoiTHVjYXMgTWVuZGVzIiwiZW1haWwiOiJsdWNhc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRkNU0vOW9UUm1JVVh5N0c1TXlva2plcjBSUTIub29FaUtQMmlEYXhhNjY5QVg0bmNyZXlUbSIsImlhdCI6MTY2MjA0ODEyOSwiZXhwIjoxNjYyMjIwOTI5fQ.CBz4KFfMd_8QzcigEle81Tij5yxov-5aWuI6uWtE1TI`,
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