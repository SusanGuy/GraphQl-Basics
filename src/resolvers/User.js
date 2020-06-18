const User = {
  posts({ id }, args, { db: { posts } }, info) {
    return posts.filter((post) => post.author === id);
  },
  comments({ id }, args, { db: { comments } }, info) {
    return comments.filter(({ author }) => author === id);
  },
};

export default User;
