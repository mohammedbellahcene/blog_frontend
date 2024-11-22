import { useSelector } from "react-redux";
import styles from "../styles/ArticleCard.module.css";

export default function ArticleCard({ article, onHandleDelete }) {
  const { userInfo } = useSelector((state) => state.user);
  console.log(article);
  // const handleDelete = () => {
  //   if (confirm("Are you sure you want to delete this article?")) {
  //     //console.log(userInfo);

  //     dispatch(deleteArticle(article._id));
  //   }
  // };

  const isAuthor = userInfo && userInfo.name === article.author;

  return (
    <div className={styles["article-card"]}>
      <img
        src={article.imageUrl}
        alt={article.title}
        className={styles["article-image"]}
      />
      <div className={styles["article-content"]}>
        <h3>{article.title}</h3>
        <p>{article.content}</p>
        <small>
          By <strong>{article.creator.name}</strong> on{" "}
          {new Date(article.createdAt).toLocaleDateString()}
        </small>
        {isAuthor && (
          <div className={styles["article-actions"]}>
            <button className={styles["edit-btn"]}>Edit</button>
            <button className={styles["delete-btn"]} onClick={onHandleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
