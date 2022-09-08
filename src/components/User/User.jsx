import { Avatar, Container } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function User({ profile_image, user_name, name }) {
  return (
    <Link to={`/${user_name}`}>
      <Container display="flex" paddingBottom="4" marginBottom="4">
        <Avatar
          size="lg"
          src={
            profile_image &&
            `${process.env.REACT_APP_BASE_URL}/uploads/profile_image/${profile_image}`
          }
        />
        <div style={{ marginLeft: '20px' }}>
          <strong>{name}</strong>
          <br />
          <small>@{user_name}</small>
        </div>
      </Container>
    </Link>
  )
}
