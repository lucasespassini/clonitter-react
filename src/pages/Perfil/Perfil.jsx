import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"

export default function Perfil() {
  const [user, setUser] = useState()
  const { user_name } = useParams()

  async function getUser() {
    const req = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6ImZlZTViYWY2LTc2NzUtNDVmOC1iZWMzLTY1MjZjODg2MDI2MCIsInByb2ZpbGVfaW1hZ2UiOiIxN2IxMmNkMi1mNTQ2LTRjNDQtOWNlNS01N2Y2NGY4MDNhODAtbWFzc2FnZW0uanBnIiwidXNlcl9uYW1lIjoibWVuZGVzIiwibmFtZSI6Ikx1Y2FzIE1lbmRlcyIsImVtYWlsIjoibHVjYXNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkYk1yZlV2dTd6Z2xYby9aN29pY3VzZXBKWDh0bHFuYU1ZTnh2THdFVm5VUlBJbFNBbXBiZmEiLCJpYXQiOjE2NjE1NzU4ODMsImV4cCI6MTY2MTc0ODY4M30.HdRN9YpjSEKxXlE4FOpVzqU0vCi2aazU9OGtZtlnyAk`,
      },
    };
    console.log(user_name)
    try {
      const user = await axios.get(`http://localhost:3000/user/user_name/${user_name}`, req)
      setUser(user)
    } catch (error) {
      console.log(error)
    }
  }
  getUser()
  return (
    <div>
      {user.name}
    </div>
  )
}