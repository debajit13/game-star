import axios from 'axios';

const getAllGames = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/games`, {
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
    },
  });
};

const getGameDetailsById = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/game?id=${id}`, {
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
    },
  });
};

export { getAllGames, getGameDetailsById };
