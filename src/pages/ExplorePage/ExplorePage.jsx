import { Container, Input } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import BottomNavbar from '../../components/Navbar/BottomNavbar'
import Navbar from '../../components/Navbar/Navbar'
import User from '../../components/User/User'
import { api } from '../../services/api'
import PostLoader from '../../components/Loading/PostLoader'

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [notFoundMsg, setNotFoundMsg] = useState('')

  useEffect(() => {
    async function searchUsers() {
      try {
        if (search) {
          setIsLoaded(false)
          const { data } = await api.get(`/user/search/${search}`)
          setResults(data)
          setIsLoaded(true)
          if (data.length < 1) {
            setNotFoundMsg('Nenhuma pessoa encontrada!')
          } else {
            setNotFoundMsg('')
          }
        } else {
          setResults([])
          setNotFoundMsg('')
          setIsLoaded(true)
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
          <h3 style={{ textAlign: 'center' }}>{notFoundMsg}</h3>
          {isLoaded ? (
            results.map(result => (
              <User
                key={result.id}
                profile_image={result.profile_image}
                user_name={result.user_name}
                name={result.name}
              />
            ))
          ) : (
            <PostLoader />
          )}
        </div>
      </Container>
    </>
  )
}
