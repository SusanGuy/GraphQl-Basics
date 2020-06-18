const Comment = {
  author({ author }, args, { db: { users } }, info) {
    return users.find(({ id }) => id === author);
  },
  post({ post }, args, { db: { posts } }, info) {
    return posts.find(({ id }) => id === post);
  },
};

export default Comment;
