
const url = {
  auth: {
    login: "/api/v1/social/auth/login",
    register: "/api/v1/social/auth/register",
  },
  posts: {
    createPost: "/api/v1/social/posts?_author=true&_comments=true&_reactions=true",
    postsInfiniteScroll: "/api/v1/social/posts?_author=true&_comments=true&_reactions=true&limit=20&offset=",
    getPost: (id) => `/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
    getPostsByFollowing: `/api/v1/social/posts/following?_author=true&_comments=true&_reactions=true`,
    postsByAuthor: (author) => `/api/v1/social/profiles/${author}/posts?_author=true&_comments=true&_reactions=true`,
    reactToPost: (id, symbol) => `/api/v1/social/posts/${id}/react/${symbol}`,
    comment: (id) => `/api/v1/social/posts/${id}/comment?_author=true`,
    deletePost: (id) => `/api/v1/social/posts/${id}`,
    editPost: (id) => `/api/v1/social/posts/${id}?_author=true&_comments=true&_reactions=true`,
  },
  profiles: {
    firstHundredUsers: "/api/v1/social/profiles?limit=100",
    nextHundredUsers: "/api/v1/social/profiles?limit=100&offset=100",
    profiles: "/api/v1/social/profiles?limit=100",
    profile: (name) => `/api/v1/social/profiles/${name}`,
    UpdateProfileMedia: (name) => `/api/v1/social/profiles/${name}/media`,
    getFollowing: (name) => `/api/v1/social/profiles/${name}?_following=true`,
    getFollowers: (name) => `/api/v1/social/profiles/${name}?_following=true`,
    getFollowersAndFollowing: (name) => `/api/v1/social/profiles/${name}?_following=true&_followers=true`,
    follow: (name) => `/api/v1/social/profiles/${name}/follow`,
    unFollow: (name) => `/api/v1/social/profiles/${name}/unfollow`
  }
};

export default url;





