import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import PostComp from "../../components/Post/Post";
import axios from 'axios'

export default function HomePage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      const req = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImZlZTViYWY2LTc2NzUtNDVmOC1iZWMzLTY1MjZjODg2MDI2MCIsInByb2ZpbGVfaW1hZ2UiOiIxN2IxMmNkMi1mNTQ2LTRjNDQtOWNlNS01N2Y2NGY4MDNhODAtbWFzc2FnZW0uanBnIiwidXNlcl9uYW1lIjoibWVuZGVzIiwibmFtZSI6Ikx1Y2FzIE1lbmRlcyIsImVtYWlsIjoibHVjYXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkYk1yZlV2dTd6Z2xYby9aN29pY3VzZXBKWDh0bHFuYU1ZTnh2THdFVm5VUlBJbFNBbXBiZmEiLCJpYXQiOjE2NjE1NzU4ODMsImV4cCI6MTY2MTc0ODY4M30.HdRN9YpjSEKxXlE4FOpVzqU0vCi2aazU9OGtZtlnyAk`,
        },
      };
      try {
        const res = await axios
          .get('http://localhost:3000/post', req)
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPosts()
  }, [])

  const component = []
  posts.forEach(post => {
    component.push(
      <PostComp
        key={post.id}
        uuid={post.uuid}
        content={post.content}
        likes={post.likes}
        createdAt={post.createdAt}
        comments={post.comments}
        user={post.user}
      />
    )
  })

  return (
    <Container>
      {component}
    </Container>
  );
}