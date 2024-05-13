import { useState, useEffect } from "react";
import fetchFromAPI from "../utils/fetchFromAPI"
import { parsePGNs, Game } from "../utils/games"
import OpeningExplorer from "./OpeningExplorer"

const Dashboard = ({username}: {username: string}) => {
  const [games, setgames] = useState<Game[] | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      let rawData = localStorage.getItem(username);
      let data: any[];
      if (rawData) {
        data = JSON.parse(rawData);
      } else {
        const apiData = await fetchFromAPI(`${username}/games/2024/05`);
        localStorage.setItem(username, JSON.stringify(apiData.games));
        data = apiData.games;
      }
      
      const pgns: string[] = data.map(item => item.pgn);
      setgames(parsePGNs(pgns, username));
    }
    fetchGames();
  }, [username])
  
  return (
    <div className="bg-darkGrey size-full p-[1em]">
      <div className="bg-grey p-[1em] mx-auto w-[min(100%,25em)] sm:w-[40em] lg:w-[60em] rounded-lg">
        {games && <OpeningExplorer games={games}/>}
      </div>
      
    </div>
  )
}

export default Dashboard