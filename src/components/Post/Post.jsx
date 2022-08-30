import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styles from './Post.module.css'

export default function Post({ uuid, content, likes, createdAt, comments, user }) {
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
            {createdAt}
          </div>
        </div>
      </div>
    </section>
  )
}