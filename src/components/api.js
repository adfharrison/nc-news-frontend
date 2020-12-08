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
