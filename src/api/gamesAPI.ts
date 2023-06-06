import axios from 'axios';

/**
 * Get All Games data from API
 */
const getAllGames = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/games`, {
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
    },
  });
};

/**
 * Get Game Data by Id
 * @param id: number
 */
const getGameDetailsById = (id: number) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/game?id=${id}`, {
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
    },
  });
};

export { getAllGames, getGameDetailsById };
