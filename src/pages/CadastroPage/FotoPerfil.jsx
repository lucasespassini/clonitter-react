import { useState } from 'react'
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from '@chakra-ui/react'
import styles from './CadastroPage.module.css'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import axios from 'axios'

export default function FotoPerfil() {
  const navigate = useNavigate()
  const { auth } = useParams()
  const authToken = localStorage.getItem('@finish-auth')

  useEffect(() => {
    if (!authToken) {
      navigate('/')
    } else if (authToken !== auth) {
      navigate('/')
    }
  }, [authToken, auth, navigate])

  const { user } = useContext(AuthContext)
  const [profile_image, setProfile_image] = useState('')
  const [srcImage, setSrcImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    function log() {
      setIsLoading(true)
      if (profile_image) {
        setSrcImage(URL.createObjectURL(profile_image))
      } else {
        setSrcImage('')
      }
      setIsLoading(false)
    }
    log()
  }, [profile_image])

  function removeImg(e) {
    e.preventDefault()
    setProfile_image('')
  }

  async function finish(e) {
    e.preventDefault()
    setIsLoading(true)
    if (profile_image) {
      try {
        const { data } = await axios({
          method: 'patch',
          url: `${process.env.REACT_APP_BASE_URL}/user/${user.sub}`,
          data: {
            profile_image,
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const newUser = JSON.parse(localStorage.getItem('user'))
        newUser.profile_image = data.profile_image
        user.profile_image = data.profile_image
        localStorage.setItem('user', JSON.stringify(newUser))
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    setIsLoading(false)
    navigate('/')
    localStorage.removeItem('@finish-auth')
  }

  return (
    <Container
      paddingBottom="5rem"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <div className={styles.containerLogo}>
        <h1 className={styles.logo}>Clonitter</h1>
      </div>
      <form style={{ flex: 2 }}>
        <FormControl>
          <FormLabel textAlign="center" fontSize="1.2rem">
            Foto de perfil (Opcional)
          </FormLabel>
          <label className={styles.containerImage} htmlFor="profile_image">
            <Input
              display="none"
              id="profile_image"
              type="file"
              accept="image/*"
              onChange={e => setProfile_image(e.target.files[0])}
            />
            <div className={styles.containerImage}>
              <Avatar w={32} h={32} src={srcImage && srcImage} />
            </div>
          </label>
        </FormControl>

        {srcImage && (
          <Button
            color="#C53030"
            margin="0 auto"
            marginBottom="3"
            display="block"
            border="1px solid #C53030"
            borderRadius={999}
            backgroundColor="transparent"
            _hover=""
            _active=""
            onClick={removeImg}
          >
            Remover foto
          </Button>
        )}

        <Button
          type="submit"
          colorScheme="messenger"
          width="100%"
          borderRadius={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={finish}
        >
          Finalizar Cadastro
          {isLoading && (
            <Spinner
              marginLeft={2}
              thickness="2px"
              speed="0.6s"
              emptyColor="gray.200"
              color="blue.500"
              size="sm"
            />
          )}
        </Button>
      </form>
    </Container>
  )
}
