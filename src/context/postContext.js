import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {

  const [postsInContext, setPostsInContext] = useState([]);

  const setInitialPosts = (posts) => {
    setPostsInContext(posts);
  }

  const deletePost = (id) => {
    setPostsInContext(postsInContext.filter(post => post.id !== id));
  }

  const updatePost = (post) => {
    setPostsInContext(postsInContext.map(p => p.id === post.id ? post : p));
  }

  const addPost = (post) => {
    setPostsInContext([post, ...postsInContext]);
  }

  const value = useMemo(
    () => ({
      postsInContext,
      setInitialPosts,
      deletePost,
      updatePost,
      addPost,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [postsInContext]
  );

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};

PostsProvider.propTypes = {
  children: PropTypes.node,
  postsInContext: PropTypes.array,
  setInitialPosts: PropTypes.func,
  deletePost: PropTypes.func,
  updatePost: PropTypes.func,
  addPost: PropTypes.func,
};