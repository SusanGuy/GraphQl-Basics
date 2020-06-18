const Post = {
  author({ author }, args, { db: { users } }, info) {
    return users.find((user) => user.id === author);
  },
  comments({ id }, args, { db: { comments } }, info) {
    return comments.filter(({ post }) => post === id);
  },
};

export default Post;
