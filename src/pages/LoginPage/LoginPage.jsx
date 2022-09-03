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
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login, errors, errouEmail, errouSenha } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  function handleSubmit(e) {
    e.preventDefault()
    login(email, password)
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
            type='email'
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

          <Button
            type="submit"
            colorScheme="messenger"
            marginTop={10}
            width="100%"
            borderRadius={0}
          >
            Entrar
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}
