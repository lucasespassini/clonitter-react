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
  Spinner,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import styles from './LoginPage.module.css'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const { signin, errors, errouEmail, errouSenha } = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signin(email, password)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <Container
      height={'100vh'}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <div className={styles.containerLogo}>
        <h1 className={styles.logo}>Clonitter</h1>
      </div>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          <FormErrorMessage>{errors.emailError && errors.emailError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errouSenha || errouEmail}>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
            Senha
          </FormLabel>
          <InputGroup>
            <Input
              paddingX="1"
              type={show ? 'text' : 'password'}
              variant="flushed"
              placeholder="Digite sua senha"
              focusBorderColor="#0063D1"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant="link"
                aria-label={show ? 'Esconder senha' : 'Mostrar senha'}
                onClick={handleClick}
                icon={show ? <ViewIcon /> : <ViewOffIcon />}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.passwordError}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="messenger"
          marginTop={10}
          marginBottom={3}
          width="100%"
          borderRadius={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Entrar
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
        <Link to={'/cadastro'}>Não tem uma conta?</Link>
      </form>
    </Container>
  )
}
