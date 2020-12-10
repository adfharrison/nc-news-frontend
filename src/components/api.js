import Axios from 'axios';

const newsApi = Axios.create({
  baseURL: 'https://alans-news-app.herokuapp.com/api',
});

export const getUsers = async () => {
  const { data } = await newsApi.get('/users');
  return data.users;
};

export const sendNewUser = async (addUser) => {
  const request = {
    newUser: {
      username: addUser.username,
      name: addUser.name,
      avatar_url: addUser.avatar_url,
    },
  };

  const { data } = await newsApi.post('/users', request);

  return data;
};

export const getAllArticles = async (params) => {
  const { data } = await newsApi.get('/articles', { params: params });
  return data.articles;
};

export const getArticleById = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}`, {
    params: {},
  });
  return data.article;
};

export const getCommentsById = async (article_id, params) => {
  const { data } = await newsApi.get(`/articles/${article_id}/comments`, {
    params: params,
  });
  return data.comments;
};

export const postComment = async (article_id, request) => {
  const { data } = await newsApi.post(
    `/articles/${article_id}/comments`,
    request
  );
  return data.newComment;
};

export const postArticle = async (request) => {
  const { data } = await newsApi.post('/articles', request);

  return data.newArticle;
};

export const getAllTopics = async () => {
  const { data } = await newsApi.get('/topics');

  let topicsArr = data.topics.map((topic) => {
    return topic.slug;
  });
  return topicsArr;
};

export const removeArticle = async (article_id) => {
  const { status } = await newsApi.delete(`/articles/${article_id}`);
  return status;
};

export const removeComment = async (comment_id) => {
  const { status } = await newsApi.delete(`/comments/${comment_id}`);
  return status;
};

export const changeArticleVotes = async (article_id, request) => {
  const { status } = await newsApi.patch(`/articles/${article_id}`, request);
  return status;
};

export const changeCommentVotes = async (comment_id, request) => {
  const { status } = await newsApi.patch(`/comments/${comment_id}`, request);
  return status;
};

export const postTopic = async (request) => {
  const { status } = await newsApi.post('/topics', request);
  return status;
};
