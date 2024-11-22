import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import styles from "../styles/Articles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../store/slices/articleSlice";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // Fetch articles from the API
  const fetchArticles = async () => {
    try {
      const res = await fetch("http://localhost:3012/api/articles"); //  URL backend.
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this article?")) {
      //console.log(userInfo);

      dispatch(deleteArticle(id));
      setArticles((prev) => prev.filter((article) => article._id !== id));
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className={styles["articles-container"]}>
      <h1>All Articles</h1>
      {loading ? (
        <p>Loading articles...</p>
      ) : articles.length > 0 ? (
        <div className={styles["articles-grid"]}>
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onHandleDelete={() => handleDelete(article._id)}
            />
          ))}
        </div>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}
