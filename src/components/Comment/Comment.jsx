import { Avatar } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/pt-br'
import styles from './Comment.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

moment.locale('pt-br')
export default function Comment({ content, likes, createdAt, user }) {
  const [timeAgo, setTimeAgo] = useState()

  useEffect(() => {
    function commentTime() {
      const commentData = new Date(createdAt).toLocaleString()
      const data = commentData.split(' ')[0]
      const horas = commentData.split(' ')[1]
      const hora = horas.split(':')[0]
      const minuto = horas.split(':')[1]
      const segundo = horas.split(':')[2]
      const dia = data.split('/')[0]
      const mes = data.split('/')[1]
      const ano = data.split('/')[2]
      const commentDataCerta = `${ano}/${mes}/${dia} ${hora}:${minuto}:${segundo}`
      setTimeAgo(moment(commentDataCerta).fromNow())
    }
    commentTime()
  }, [createdAt])

  return (
    <section className={styles.commentContainer}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '64px', height: '64px' }}>
          <Link to={user ? `/${user.user_name}` : '/'}>
            <Avatar
              size="lg"
              src={
                user.profile_image &&
                `${process.env.REACT_APP_BASE_URL}/uploads/profile_image/${user.profile_image}`
              }
            />
          </Link>
        </div>
        <div className={styles.commentContentContainer}>
          <Link to={`/${user.user_name}`}>
            <strong>{user.name}</strong>
            <small> @{user.user_name}</small>
          </Link>
          <p style={{padding: '10px 0'}}>{content}</p>
        </div>
      </div>
      <div className={styles.commentInfo}>
        <div className={styles.likesComments}>
          <div className={styles.containerIconLike}>
            <FontAwesomeIcon className={styles.likeIcon} icon={faHeart} />
            {likes}
          </div>
        </div>
        <p style={{ fontSize: '.8rem' }}>{timeAgo}</p>
      </div>
    </section>
  )
}
