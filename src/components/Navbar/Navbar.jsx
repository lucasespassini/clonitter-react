import { Container } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import Drawer from '../Drawer/Drawer'

export default function Navbar() {
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
