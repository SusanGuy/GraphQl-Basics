import uuidv4 from "uuid/v4";
const Mutation = {
  createUser(
    parent,
    { data: { name, email, age = null } },
    { db: { users } },
    info
  ) {
    const emailTaken = users.some((user) => user.email === email);
    if (emailTaken) {
      throw new Error("Email taken.");
    }
    const user = {
      id: uuidv4(),
      name,
      email,
      age,
    };
    users.push(user);
    return user;
  },
  deleteUser(parets, { id }, { db: { users, posts, comments } }, info) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    const deletedUsers = users.splice(userIndex, 1);
    posts = posts.filter((post) => {
      const match = post.author === id;
      if (match) {
        comments = comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });
    comments = comments.filter((comment) => comment.author !== id);
    return deletedUsers[0];
  },
  updateUser(parent, { id, data }, { db }, info) {
    const user = db.users.find((user) => user.id === id);
    if (!user) {
      throw new Error("No user found!");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some((user) => user.email === data.email);
      if (emailTaken) {
        throw new Error("Email taken!");
      }
      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },
  createPost(parent, args, { db: { posts, users }, pubsub }, info) {
    const authorExists = users.some(({ id }) => id === args.data.author);
    if (!authorExists) {
      throw new Error("User not found");
    }
    const post = {
      id: uuidv4(),
      ...args.data,
    };
    posts.push(post);
    if (post.published) {
      pubsub.publish("post", {
        post: {
          data: { ...post },
          mutation: "CREATED",
        },
      });
    }
    return post;
  },
  updatePost(parent, { id, data }, { db: { posts }, pubsub }, info) {
    const post = posts.find((post) => post.id === id);
    const originalPost = { ...post };
    if (!post) {
      throw new Error("Post not found!");
    }
    if (typeof data.title == "string") {
      post.title = data.title;
    }
    if (typeof data.body == "string") {
      post.body = data.body;
    }
    if (typeof data.published === "boolean") {
      post.published = data.published;
      if (originalPost.published && !post.published) {
        pubsub.publish("post", {
          post: { data: originalPost, mutation: "DELETED" },
        });
      } else if (!originalPost.published && post.published) {
        pubsub.publish("post", {
          post: { data: post, mutation: "CREATED" },
        });
      } else if (post.published) {
        pubsub.publish("post", {
          post: { data: post, mutation: "UPDATED" },
        });
      }
    }
    return post;
  },
  deletePost(parent, { id }, { db: { posts, comments }, pubsub }, info) {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    const deletedPosts = posts.splice(postIndex, 1);
    comments = comments.filter((comment) => comment.post !== id);
    if (deletedPosts[0].published) {
      pubsub.publish("post", {
        data: deletedPosts[0],
        mutation: "DELETED",
      });
    }
    return deletedPosts[0];
  },
  createComment(
    _,
    { data: { text, author, post } },
    { db: { comments, users, posts }, pubsub },
    info
  ) {
    if (!users.some(({ id }) => id === author)) {
      throw new Error("User doesn't exist!");
    }
    if (!posts.some(({ id }) => id === post)) {
      throw new Error("No such post found");
    }
    if (post.published === false) {
      throw new Error("This post isn't published");
    }

    const comment = {
      id: uuidv4(),
      text,
      author,
      post,
    };
    comments.push(comment);
    pubsub.publish(`comment ${post}`, {
      comment: { mutation: "Created", data: comment },
    });
    return comment;
  },
  updateComment(parent, { id, data }, { db: { comments }, pubsub }, info) {
    const comment = comments.find((comment) => comment.id === id);
    if (!comment) {
      throw new Error("No comment found!");
    }
    if (typeof data.text === "string") {
      comment.text = text;
      pubsub.publish(`comment ${comment.post}`, {
        comment: { mutation: "Updated", data: comment },
      });
    }
    return comment;
  },
  deleteComment(parent, { id }, { db: { comments }, pubsub }, info) {
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) {
      throw new Error("No such comment found");
    }
    const deletedComments = comments.splice(commentIndex, 1);
    pubsub.publish(`comment ${deletedComments[0].post}`, {
      comment: { mutation: "Deleted", data: deletedComments[0] },
    });
    return deletedComments[0];
  },
};

export default Mutation;
