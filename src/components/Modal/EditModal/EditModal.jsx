import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import styles from '../../../pages/CadastroPage/CadastroPage.module.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/auth'
import axios from 'axios'
import { api } from '../../../services/api'
import { useNavigate } from 'react-router-dom'

export default function EditModal() {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, errors, errouUser_name, errouName } = useContext(AuthContext)
  const [profile_image, setProfile_image] = useState('')
  const [srcImage, setSrcImage] = useState(
    `${process.env.REACT_APP_BASE_URL}/uploads/profile_image/${user.profile_image}`
  )
  const [user_name, setUser_name] = useState(user.user_name)
  const [name, setName] = useState(user.name)
  const [mudouFoto, setMudouFoto] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    function toggleImg() {
      if (profile_image) {
        setSrcImage(URL.createObjectURL(profile_image))
        setMudouFoto(true)
      } else {
        setSrcImage(
          `${process.env.REACT_APP_BASE_URL}/uploads/profile_image/${user.profile_image}`
        )
      }
    }
    toggleImg()
  }, [profile_image, user.profile_image])

  async function atualizar() {
    setIsLoading(true)
    if (mudouFoto) {
      try {
        const { data } = await axios({
          method: 'patch',
          url: `${process.env.REACT_APP_BASE_URL}/user/${user.sub}`,
          data: {
            profile_image,
            user_name,
            name,
          },
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const newUser = JSON.parse(localStorage.getItem('user'))
        newUser.profile_image = data.profile_image
        newUser.user_name = data.user_name
        newUser.name = data.name
        user.profile_image = data.profile_image
        user.user_name = data.user_name
        user.name = data.name
        localStorage.setItem('user', JSON.stringify(newUser))
        setIsLoading(false)
        navigate(`/${user_name}`)
        window.location.reload()
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    } else {
      try {
        const { data } = await api.patch(`/user/${user.sub}`, {
          user_name,
          name,
        })
        console.log(data)
        const newUser = JSON.parse(localStorage.getItem('user'))
        newUser.user_name = data.user_name
        newUser.name = data.name
        user.user_name = data.user_name
        user.name = data.name
        localStorage.setItem('user', JSON.stringify(newUser))
        setIsLoading(false)
        navigate(`/${user_name}`)
        window.location.reload()
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    }
  }

  function calcelar() {
    setProfile_image('')
    setSrcImage(
      `${process.env.REACT_APP_BASE_URL}/uploads/profile_image/${user.profile_image}`
    )
    setUser_name(user.user_name)
    setName(user.name)
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="messenger" borderRadius={5}>
        Editar Perfil
      </Button>

      <Modal
        onClose={onClose}
        size="full"
        isOpen={isOpen}
        scrollBehavior={'outside'}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#0A0C10">
          <Container flex='1' maxW="600">
            <ModalHeader>Editar perfil</ModalHeader>
            <ModalCloseButton marginTop="6px" onClick={calcelar} />
            <ModalBody>
              <FormControl>
                <FormLabel textAlign="center" fontSize="1.1rem">
                  Foto de perfil
                </FormLabel>
                <label
                  className={styles.containerImage}
                  htmlFor="profile_image"
                >
                  <Input
                    display="none"
                    id="profile_image"
                    type="file"
                    accept="image/*"
                    onChange={e => setProfile_image(e.target.files[0])}
                  />
                  <div className={styles.containerImage}>
                    <Avatar size="xl" src={srcImage && srcImage} />
                  </div>
                </label>
              </FormControl>

              <FormControl isInvalid={errouUser_name}>
                <FormLabel marginTop={5} paddingX="1">
                  Nome de usuário
                </FormLabel>
                <Input
                  type="text"
                  paddingX="1"
                  variant="flushed"
                  placeholder="Digite seu nome de usuário"
                  focusBorderColor="#0063D1"
                  value={user_name}
                  onChange={e => setUser_name(e.target.value)}
                />
                <FormErrorMessage>{errors.user_nameError}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errouName}>
                <FormLabel marginTop={5} paddingX="1">
                  Nome
                </FormLabel>
                <Input
                  type="text"
                  paddingX="1"
                  variant="flushed"
                  placeholder="Digite seu nome"
                  focusBorderColor="#0063D1"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <FormErrorMessage>{errors.nameError}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter  flexDirection="column">
              <Button
                width="100%"
                marginBottom="5"
                onClick={atualizar}
                colorScheme="messenger"
                borderRadius={0}
              >
                Atualizar
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
              <Button
                width="100%"
                onClick={calcelar}
                colorScheme="red"
                borderRadius={0}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Container>
        </ModalContent>
      </Modal>
    </>
  )
}
