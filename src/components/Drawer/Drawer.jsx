import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import {
  faArrowRightFromBracket,
  faBars,
  faBell,
  faGear,
  faHouseChimney,
  faMagnifyingGlass,
  faMessage,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import styles from './Drawer.module.css'

export default function PlacementExample() {
  const { logout, user } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = useRef()

  return (
    <>
      <FontAwesomeIcon className={styles.icon} icon={faBars} onClick={onOpen} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor="#0A0C10">
          <DrawerCloseButton marginY="2" />
          <DrawerHeader borderBottom="1px solid #7A828E">Menu</DrawerHeader>

          <DrawerBody
            paddingY="30"
            display="flex"
            flexDirection="column"
            justifyContent={'space-evenly'}
          >
            <Link className={styles.menuItem} to={'/'}>
              <FontAwesomeIcon
                className={styles.menuItemIcon}
                icon={faHouseChimney}
              />
              Home
            </Link>
            <Link className={styles.menuItem} to={'/explore'}>
              <FontAwesomeIcon
                className={styles.menuItemIcon}
                icon={faMagnifyingGlass}
              />
              Explorar
            </Link>
            <Link className={styles.menuItem} to={'/messages'}>
              <FontAwesomeIcon
                className={styles.menuItemIcon}
                icon={faMessage}
              />
              Mensagens
            </Link>
            <Link className={styles.menuItem} to={'/notifications'}>
              <FontAwesomeIcon className={styles.menuItemIcon} icon={faBell} />
              Notificações
            </Link>
            <Link
              className={styles.menuItem}
              to={user ? `/${user.user_name}` : '/'}
            >
              <FontAwesomeIcon className={styles.menuItemIcon} icon={faUser} />
              Perfil
            </Link>
            <Link className={styles.menuItem} to={'/settings'}>
              <FontAwesomeIcon className={styles.menuItemIcon} icon={faGear} />
              Configurações
            </Link>
          </DrawerBody>

          <DrawerFooter
            display="flex"
            justifyContent="space-between"
            borderTop="1px solid #7A828E"
          >
            <Link to={user ? `/${user.user_name}` : '/'}>
              <Avatar
                name={user && `${user.user_name}-icon`}
                src={
                  user &&
                  `${process.env.REACT_APP_BASE_URL}/uploads/profile_image/${user.profile_image}`
                }
              />
            </Link>
            <FontAwesomeIcon
              className={styles.logoutIcon}
              icon={faArrowRightFromBracket}
              onClick={logout}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
