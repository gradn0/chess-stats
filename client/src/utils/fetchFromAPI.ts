const fetchFromAPI = async (query: string) => {
  const res = await fetch(`https://api.chess.com/pub/player/${query}`);
  const json = await res.json();
  return json;
}
export default fetchFromAPI;
