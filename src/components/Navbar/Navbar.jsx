import styles from './Navbar.module.css'
import { Link,Outlet } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/perfil'>Perfil</Link>
        <Outlet />
      </nav>
    </header>
  )
}
