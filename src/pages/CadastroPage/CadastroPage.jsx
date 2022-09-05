import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import styles from './CadastroPage.module.css'
import { Link } from 'react-router-dom'

export default function CadastroPage() {
  const { errors, errouUser_name, errouName, errouEmail, errouSenha, signup } =
    useContext(AuthContext)

  const [profile_image, setProfile_image] = useState('')
  const [user_name, setUser_name] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errouConfirmSenha, setErrouConfirmSenha] = useState(false)

  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const pass = () => setShowPass(!showPass)
  const confirmPass = () => setShowConfirmPass(!showConfirmPass)

  function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErrouConfirmSenha(true)
      errors.confirmPassError = 'As duas senhas não são iguais!'
    } else {
      signup(profile_image, user_name, name, email, password)
    }
  }

  return (
    <Container
      height={'100vh'}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <h2 className={styles.title}>Cadastro</h2>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <FormControl>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
            Foto de perfil (Opcional)
          </FormLabel>
          <Input
            type="file"
            paddingX="1"
            variant="flushed"
            focusBorderColor="#0063D1"
            onChange={e => setProfile_image(e.target.files[0])}
          />
        </FormControl>

        <FormControl isInvalid={errouUser_name}>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
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
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <FormErrorMessage>{errors.user_nameError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errouName}>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
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

        <FormControl isInvalid={errouEmail}>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
            E-mail
          </FormLabel>
          <Input
            type="email"
            paddingX="1"
            variant="flushed"
            placeholder="Digite seu e-mail"
            focusBorderColor="#0063D1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <FormErrorMessage>{errors.emailError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errouSenha}>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
            Senha
          </FormLabel>
          <InputGroup>
            <Input
              paddingX="1"
              type={showPass ? 'text' : 'password'}
              variant="flushed"
              placeholder="Digite sua senha"
              focusBorderColor="#0063D1"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant="link"
                aria-label={showPass ? 'Esconder senha' : 'Mostrar senha'}
                onClick={pass}
                icon={showPass ? <ViewIcon /> : <ViewOffIcon />}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.passwordError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errouConfirmSenha || errouSenha}>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
            Confirme sua senha
          </FormLabel>
          <InputGroup>
            <Input
              paddingX="1"
              type={showConfirmPass ? 'text' : 'password'}
              variant="flushed"
              placeholder="Digite novamente sua senha"
              focusBorderColor="#0063D1"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant="link"
                aria-label={
                  showConfirmPass ? 'Esconder senha' : 'Mostrar senha'
                }
                onClick={confirmPass}
                icon={showConfirmPass ? <ViewIcon /> : <ViewOffIcon />}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.confirmPassError || errors.passwordError}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="messenger"
          marginTop={10}
          width="100%"
          borderRadius={0}
          onClick={handleSubmit}
        >
          Cadastre-se
        </Button>
      </form>
      <Link to={'/login'}>Já tem uma conta?</Link>
    </Container>
  )
}
