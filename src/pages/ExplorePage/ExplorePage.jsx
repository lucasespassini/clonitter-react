import { Container, Input } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import BottomNavbar from '../../components/Navbar/BottomNavbar'
import Navbar from '../../components/Navbar/Navbar'
import User from '../../components/User/User'
import { api } from '../../services/api'

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  useEffect(() => {
    async function searchUsers() {
      try {
        if (search.length > 0) {
          const { data } = await api.get(`/user/search/${search}`)
          setResults(data)
        } else {
          setResults([])
        }
      } catch (error) {
        console.log(error)
      }
    }
    searchUsers()
  }, [search])

  return (
    <>
      <Navbar />
      <BottomNavbar />
      <Container maxW="650">
        <Input
          placeholder="Pesquisar"
          marginY="5"
          borderRadius={999}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div>
          {results &&
            results.map((result, i) => (
              <User
                key={i}
                profile_image={result.profile_image}
                user_name={result.user_name}
                name={result.name}
              />
            ))}
        </div>
      </Container>
    </>
  )
}
