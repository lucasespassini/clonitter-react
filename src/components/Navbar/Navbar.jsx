import { Container } from '@chakra-ui/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import styles from './Navbar.module.css'
import Drawer from '../Drawer/Drawer'

export default function Navbar() {
  const { logout, user } = useContext(AuthContext)

  return (
    <Container
      maxW="650"
      paddingY='3'
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link className={styles.logo} to={'/'}>
        Clonitter
      </Link>
      <Drawer />
    </Container>
  )
}
