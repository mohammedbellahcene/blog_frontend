import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, addArticle } from "../store/slices/articleSlice";
import ArticleCard from "../components/ArticleCard";
import styles from "../styles/Dashboard.module.css";
export default function Dashboard() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.articles);
  const { userInfo } = useSelector((state) => state.user);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const handleAddArticle = async (e) => {
    e.preventDefault();
    const newArticle = {
      title,
      content,
      imageUrl,
      author: userInfo?.name || "Anonymous",
    };
    await dispatch(addArticle(newArticle));
    setTitle("");
    setContent("");
    setImageUrl("");
    setShowForm(false);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles["dashboard-header"]}>
        <h1>Welcome, {userInfo?.name || "Guest"}!</h1>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Article"}
        </button>
      </div>

      {showForm && (
        <form
          className={styles["add-article-form"]}
          onSubmit={handleAddArticle}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {loading ? (
        <p>Loading articles...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className={styles["articles-grid"]}>
          {articles.length === 0 ? (
            <p className="no-articles">No articles available</p>
          ) : (
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
