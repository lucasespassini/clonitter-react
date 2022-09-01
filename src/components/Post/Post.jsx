import { Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import 'moment/locale/pt-br'
import styles from './Post.module.css'

moment.locale('pt-br')
export default function Post({ uuid, content, likes, createdAt, comments, user }) {
  const [timeAgo, setTimeAgo] = useState()

  useEffect(() => {
    function postTime() {
      const postData = new Date(createdAt).toLocaleString()
      const data = postData.split(' ')[0]
      const horas = postData.split(' ')[1]
      const hora = horas.split(':')[0]
      const minuto = horas.split(':')[1]
      const segundo = horas.split(':')[2]
      const dia = data.split('/')[0]
      const mes = data.split('/')[1]
      const ano = data.split('/')[2]
      const postDataCerta = `${ano}/${mes}/${dia} ${hora-3}:${minuto}:${segundo}`
      setTimeAgo(moment(postDataCerta).fromNow())
    }
    postTime()
  })

  return (
    <section className={styles.postContainer}>
      <Link to={`/perfil/${user.user_name}`} >
        <Avatar size='lg' name={user.user_name + '-icon'} src={'http://localhost:3000/uploads/profile_image/' + user.profile_image} />
      </Link>
      <div className={styles.postContentContainer}>
        <Link to={`/perfil/${user.user_name}`}>
          <strong>{user.name}</strong>
          <small> @{user.user_name}</small>
        </Link>
        <Link className={styles.postContent} to={`/post/${uuid}`}>
          <p>
            {content}
          </p>
        </Link>
        <div className={styles.postInfo}>
          <div className={styles.likesComments}>
            <button>❤ {likes}</button>
            <button>⛲ {comments.length}</button>
          </div>
          <div>
            {timeAgo}
          </div>
        </div>
      </div>
    </section>
  )
}