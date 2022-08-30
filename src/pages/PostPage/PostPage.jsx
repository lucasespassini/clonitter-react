import { Container, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostLoader from "../../components/Loading/PostLoader";
import Post from "../../components/Post/Post";

export default function PostPage() {
  const { uuid } = useParams()
  const [post, setPost] = useState({
    id: 0,
    uuid: uuid,
    content: '',
    likes: 0,
    createdAt: '',
    comments: [],
    user: {},
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function getPost() {
      const req = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXVpZCI6IjkzMDQ1MjYzLTQ3N2MtNDE3My1hZGM5LWUxNzFjMTljMWUwZiIsInByb2ZpbGVfaW1hZ2UiOiJjYzdkM2VlYi0wMzAyLTQ0NjgtYTg2MS0xZDViNmE4MWQ2OGQtZm90by5qcGciLCJ1c2VyX25hbWUiOiJtZW5kZXMiLCJuYW1lIjoiTHVjYXMgTWVuZGVzIiwiZW1haWwiOiJsdWNhc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRqYWtrYU9tOW05bVdZMXFWeVA0aS9POGtQSEJZcTJhbllQZC9Dd0Rhd1RzaS9MUUVKRmhtYSIsImlhdCI6MTY2MTg3NDExOSwiZXhwIjoxNjYyMDQ2OTE5fQ.HSnpI5yXMZL1LZeo15pJFyP1d0aFCU75OvJXsGaitYw`,
        },
      };

      try {
        const res = await axios.get(`http://localhost:3000/post/uuid/${uuid}`, req)
        setPost(res.data)
        setIsLoaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [uuid])

  return (
    <Container marginX={'auto'}>
      {
        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={1}
          borderRadius={10}
        >
          <Post
            uuid={post.uuid}
            content={post.content}
            likes={post.likes}
            createdAt={post.createdAt}
            comments={post.comments}
            user={post.user}
          />
        </Skeleton>
      }
      {
        isLoaded ?
          post.comments.map((comment) =>
            <Post
              key={comment.id}
              uuid={''}
              content={comment.content}
              likes={comment.likes}
              createdAt={comment.createdAt}
              comments={[]}
              user={comment.user}
            />
          ) : <PostLoader />
      }
    </Container>
  )
}