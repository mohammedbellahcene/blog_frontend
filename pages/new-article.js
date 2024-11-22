import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { createArticle } from "../store/slices/articleSlice";
import styles from "../styles/NewArticle.module.css";
export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      title,
      content,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    // Dispatch the action to add the article
    const result = await dispatch(createArticle(newArticle));

    if (result.payload) {
      router.push("/articles"); // Redirect to All Articles page
    }
  };

  return (
    <div className={styles["new-article-container"]}>
      <h1>Create a New Article</h1>
      <form onSubmit={handleSubmit} className={styles["new-article-form"]}>
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <textarea
          placeholder="Article Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
