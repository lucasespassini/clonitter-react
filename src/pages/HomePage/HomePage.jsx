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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXVpZCI6IjA4MWY0NmY1LThkYTAtNDE4MC1hMzI3LWQ2ZmNmYjNlOTdjYSIsInByb2ZpbGVfaW1hZ2UiOiIzNzNmMWFjOS1hNzc5LTRkMDktYThmNC1mMzIyZDFlNTc4ZDQtZnQuanBnIiwidXNlcl9uYW1lIjoibWVuZGVzIiwibmFtZSI6Ikx1Y2FzIE1lbmRlcyBFc3Bhc3NpbmkiLCJlbWFpbCI6Imx1Y2FzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEVNZVFBRGtaZEJNWnNqN2tPSTU1cy5hdkZBeGdqWnVFN3R1T2VxYzlLQmQwZ01IaHQySWcyIiwiaWF0IjoxNjYyMDg2NTUzLCJleHAiOjE2NjIyNTkzNTN9.O7IWQDAUN59sMAPooaklutnHru2IRUg7dXY9nY2a5LY`,
        },
      };
      try {
        const res = await axios
          .get('http://localhost:3000/post/user/5/following', req)
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