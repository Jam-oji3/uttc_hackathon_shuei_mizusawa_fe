// import Image from 'next/image'; // この行を削除
import styles from './CreatePost.module.css';

export const CreatePost = () => {
  return (
    <div className={styles.createPostContainer}>
      <div className={styles.avatarContainer}>
         <img 
            src="https://i.pravatar.cc/150?u=my-avatar" 
            alt="自分のアバター" 
            className={styles.avatar}
         />
      </div>
      <div className={styles.formContainer}>
        <textarea
          className={styles.textarea}
          placeholder="いまどうしてる？"
        />
        <div className={styles.actions}>
          <button className={styles.postButton}>ポストする</button>
        </div>
      </div>
    </div>
  );
};