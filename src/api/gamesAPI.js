import axios from 'axios';

const getAllGames = () => {
  return axios.get(
    'https://free-to-play-games-database.p.rapidapi.com/api/games',
    {
      headers: {
        'X-RapidAPI-Key': 'ccdd34c926mshb25a17bd5b4b2b8p103fdbjsn932b28a4dda0',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    }
  );
};

export { getAllGames };
