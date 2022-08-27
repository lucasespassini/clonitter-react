import { Avatar } from "@chakra-ui/react";
import styles from './Post.module.css'

export default function PostComp({ uuid, content, likes, createdAt, comments, user }) {
  return (
    <section className={styles.postContainer}>
      <Avatar size='lg' name={user.user_name + '-icon'} src={'http://localhost:3000/uploads/profile_image/' + user.profile_image} />
      <div className={styles.postContentContainer}>
        <p>
          <strong>{user.name}</strong>
          <small> @{user.user_name}</small>
        </p>
        <p className={styles.postContent}>
          {content}
        </p>
        <div className={styles.postInfo}>
          <div className={styles.likesComments}>
            <p>❤ {likes}</p>
            <p>⛲ {comments.length}</p>
          </div>
          <div>
            {createdAt}
          </div>
        </div>
      </div>
    </section>
  )
}