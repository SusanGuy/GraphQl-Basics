let users = [
  {
    id: "1",
    name: "Susan",
    email: "susan@gmail.com",
  },
  {
    id: "2",
    name: "Dai",
    email: "dai@gmail.com",
    age: 12,
  },
  {
    id: "3",
    name: "Sara",
    email: "sara@gmail.com",
  },
];

let posts = [
  {
    id: "0be68955-fb07-4105-b8f4-bc67a0dfa627",
    title: "GraphQL 101",
    body: "This is how to use GraphQL...",
    published: true,
    author: "1",
  },
  {
    id: "2a5a32e2-7e18-4716-8a09-171e9d345dd2",
    title: "GraphQL 201",
    body: "This is an advanced GraphQL post...",
    published: false,
    author: "1",
  },
  {
    id: "6ad63338-6010-445b-96f6-9c9ac3d9f9c9",
    title: "Programming Music",
    body:
      "David Cutter Music is my favorite artist to listen to while programming.",
    published: false,
    author: "2",
  },
];

let comments = [
  {
    id: "912526cf-9141-4f50-9b17-201f8c8f9538",
    text: "Could not agree more!",
    author: "1",
    post: "6ad63338-6010-445b-96f6-9c9ac3d9f9c9",
  },
  {
    id: "b141d676-f519-4a9f-a942-5544e8b4115a",
    text: "Thanks! Super useful post.",
    author: "2",
    post: "2a5a32e2-7e18-4716-8a09-171e9d345dd2",
  },
  {
    id: "103",
    text: "Never mind! I got it to work!",
    author: "3",
    post: "0be68955-fb07-4105-b8f4-bc67a0dfa627",
  },
  {
    id: "104",
    text: "Thid did no work!",
    author: "3",
    post: "0be68955-fb07-4105-b8f4-bc67a0dfa627",
  },
];

const db = { users, posts, comments };

export { db as default };
