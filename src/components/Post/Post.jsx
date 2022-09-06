import { Avatar } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/pt-br'
import styles from './Post.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'

moment.locale('pt-br')
export default function Post({
  uuid,
  content,
  likes,
  createdAt,
  comments,
  user,
}) {
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
      const postDataCerta = `${ano}/${mes}/${dia} ${hora}:${minuto}:${segundo}`
      setTimeAgo(moment(postDataCerta).fromNow())
    }
    postTime()
  }, [createdAt])

  return (
    <section className={styles.postContainer}>
      <Link to={user ? `/${user.user_name}` : '/'}>
        <Avatar
          size="lg"
          src={
            user.profile_image &&
            `${process.env.REACT_APP_BASE_URL}/uploads/profile_image/${user.profile_image}`
          }
        />
      </Link>
      <div className={styles.postContentContainer}>
        <Link to={`/${user.user_name}`}>
          <strong>{user.name}</strong>
          <small> @{user.user_name}</small>
        </Link>
        <Link className={styles.postContent} to={`/post/${uuid}`}>
          <p>{content}</p>
        </Link>
        <div className={styles.postInfo}>
          <div className={styles.likesComments}>
            <div className={styles.containerIconLike}>
              <FontAwesomeIcon className={styles.likeIcon} icon={faHeart} />
              {likes}
            </div>
            <div className={styles.containerIconComment}>
              <FontAwesomeIcon
                className={styles.commentIcon}
                icon={faComment}
              />
              {comments.length}
            </div>
          </div>
          <Link style={{ fontSize: '.8rem' }} to={`/post/${uuid}`}>
            {timeAgo}
          </Link>
        </div>
      </div>
    </section>
  )
}
