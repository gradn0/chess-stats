interface data {
  games: any[],
  stats: any
}

const fetchFromAPI = async (query: string) => {
  const res = await fetch(`https://api.chess.com/pub/player/${query}`);
  const json = await res.json();
  return json;
}

export const getData = async (username: string) => {
  let rawData = localStorage.getItem(username);
  let data;
  if (rawData) {
    data = JSON.parse(rawData);
  } else {
    const games = await fetchFromAPI(`${username}/games/2024/05`);
    const stats = await fetchFromAPI(`${username}/stats`);
    data = {
      games: games.games,
      stats: stats,
    };
    localStorage.setItem(username, JSON.stringify(data));
  }
  return data;
}
export default fetchFromAPI;
