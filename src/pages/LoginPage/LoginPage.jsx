import { useState, useContext } from 'react'

import { AuthContext } from '../../contexts/auth'

export default function LoginPage() {
  const { authenticated, login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      {String(authenticated)}
      <br />
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Senha"
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Entrar</button>
    </form>
  )
}
