import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all articles
export const fetchArticles = createAsyncThunk(
  "articles/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3012/api/articles");
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error fetching articles");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createArticle = createAsyncThunk(
  "articles/create",
  async (articleData, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3012/api/articles/newArticle", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (!res.ok) throw new Error("Failed to create article");
      return await res.json(); // Return the newly created article
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/delete",
  async (articleId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:3012/api/articles/deleteArticle/${articleId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      console.log(res);

      if (!res.ok) throw new Error("Failed to delete article");

      const articleId = await res.json();
      return articleId; // Return the ID of the deleted article
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add the extra reducer for createArticle
extraReducers: (builder) => {
  builder
    // Other cases...
    .addCase(createArticle.fulfilled, (state, action) => {
      state.articles.unshift(action.payload); // Add new article to the top of the list
    })
    .addCase(createArticle.rejected, (state, action) => {
      state.error = action.payload;
    });
};

// Delete an article

/*export const deleteArticle = async (articleId) => {
  try {
    const response = await fetch(
      `http://localhost:3012/api/articles/deleteArticle/${articleId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.ok) {
      alert("Article deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting article:", error);
  }
};*/

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],

    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Delete Article
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      // console.log(state.articles);

      state.articles = state.articles.filter((article) => {
        return article._id !== action.payload;
      }); // Supprimer l'article localement
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default articleSlice.reducer;
