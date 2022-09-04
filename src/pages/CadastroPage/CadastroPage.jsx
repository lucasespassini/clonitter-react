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

export default function CadastroPage() {
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
      <h2 className={styles.title}>Cadastro</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormControl isInvalid={errouEmail}>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
            Nome de usuário
          </FormLabel>
          <Input
            type="email"
            paddingX="1"
            variant="flushed"
            placeholder="Digite seu nome de usuário"
            focusBorderColor="#0063D1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <FormErrorMessage>{errors.emailError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errouEmail}>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
            Nome
          </FormLabel>
          <Input
            type="email"
            paddingX="1"
            variant="flushed"
            placeholder="Digite seu nome"
            focusBorderColor="#0063D1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <FormErrorMessage>{errors.emailError}</FormErrorMessage>
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

        <FormControl isInvalid={errouSenha || errouEmail}>
          <FormLabel marginTop={5} paddingX="1" fontSize="1.2rem">
            Confirme sua senha
          </FormLabel>
          <InputGroup>
            <Input
              paddingX="1"
              type={show ? 'text' : 'password'}
              variant="flushed"
              placeholder="Digite novamente sua senha"
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
          width="100%"
          borderRadius={0}
        >
          Cadastre-se
        </Button>
      </form>
    </Container>
  )
}
