import Axios from 'axios';

const newsApi = Axios.create({
  baseURL: 'https://alans-news-app.herokuapp.com/api',
});

export const getUsers = async () => {
  const { data } = await newsApi.get('/users');
  return data.users;
};

export const sendNewUser = (newUser) => {
  return newsApi
    .post('.users', {
      newUser: {
        username: 'this is a new user',
        name: 'the user that is new, is new',
        avatar_url: 'picture of avatar',
      },
    })
    .then(({ data }) => {});
};
