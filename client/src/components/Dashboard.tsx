import { useState, useEffect } from "react";
import { getData } from "../utils/fetchFromAPI"
import { parsePGNs, Game } from "../utils/games"
import OpeningExplorer from "./OpeningExplorer"
import StatsGrid from "./StatsGrid";

const Dashboard = ({username, newUser}: {username: string, newUser: () => void}) => {
  const [games, setgames] = useState<Game[] | null>(null);
  const [stats, setstats] = useState();

  const fetchData = async () => {
    const {games, stats} = await getData(username);
    const pgns: string[] = games.map((item: any) => item.pgn);
    setgames(parsePGNs(pgns, username));
    setstats(stats);
  }

  useEffect(() => {
    fetchData();
  }, [username])
  
  return (
    <div className="bg-darkGrey size-full p-[1em]">
      <div className="mx-auto w-[min(100%,25em)] sm:w-[min(100%,40em)] lg:w-[60em] space-y-[1em]">
        <h3 className="text-lg">
          <span className="font-semibold text-md lg:text-lg">{username}</span>
          <span onClick={newUser} className="cursor-pointer text-sm lg:text-base"> (Switch)</span>
        </h3>
        <div className="bg-grey p-[1em] rounded-lg">
          {games && <OpeningExplorer games={games}/>}
        </div>
        {stats && <StatsGrid stats={stats}/>}
      </div>
    </div>
  )
}

export default Dashboard