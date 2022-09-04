import { Container } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouseChimney,
  faMagnifyingGlass,
  faBell,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import styles from './BottomNavbar.module.css'

export default function BottomNavbar() {
  const { user } = useContext(AuthContext)
  const { pathname } = useLocation()

  return (
    <Container maxW='650' className={styles.bottomContainer}>
      <Link to={'/'}>
        <FontAwesomeIcon
          className={pathname === '/' ? styles.iconActive : styles.icon}
          icon={faHouseChimney}
        />
      </Link>

      <Link to={'/'}>
        <FontAwesomeIcon
          className={pathname === '/explore' ? styles.iconActive : styles.icon}
          icon={faMagnifyingGlass}
        />
      </Link>

      <Link to={'/'}>
        <FontAwesomeIcon
          className={pathname === '/notifications' ? styles.iconActive : styles.icon}
          icon={faBell}
        />
      </Link>

      <Link to={user ? `/${user.user_name}` : ''}>
        <FontAwesomeIcon
          className={user && pathname === `/${user.user_name}` ? styles.iconActive : styles.icon}
          icon={faUser}
        />
      </Link>
    </Container>
  )
}
