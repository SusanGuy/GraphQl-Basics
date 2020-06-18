const Query = {
  users(parent, { query }, { db: { users } }, info) {
    return !query
      ? users
      : users.filter(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase())
        );
  },
  comments(parent, { query }, { db: { comments } }, info) {
    return !query
      ? comments
      : comments.filter(({ text }) =>
          text.toLowerCase().includes(query.toLowerCase())
        );
  },
  posts(parent, { query }, { db: { posts } }, info) {
    return !query
      ? posts
      : posts.filter(
          ({ title, body }) =>
            title.toLowerCase().includes(query.toLowerCase()) ||
            body.toLowerCase().includes(query.toLowerCase())
        );
  },
  me() {
    return {
      id: "abc123",
      name: "Susan Subedi",
      email: "susansubedi34@gmail.com",
    };
  },
  post() {
    return {
      id: "12ab",
      title: "Nice blog",
      body: "This blog is very useful to us",
      published: false,
    };
  },
};

export default Query;
