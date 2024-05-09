import { useEffect, useState } from "react"
import fetchFromAPI from "./utils/fetchFromAPI";
import { Game, parsePGNs } from "./utils/games";
import { Tree, populateTree } from "./utils/MovesTree";

const username = "";

function App() {
  const [games, setgames] = useState<Game[] | null>(null);

  useEffect(() => {
    const getPGNs = async () => {
      let rawData = localStorage.getItem("data");
      let data: any[];
      if (rawData) {
        data = JSON.parse(rawData);
      } else {
        data = await fetchFromAPI(`${username}/games/2024/05`);
        localStorage.setItem("data", JSON.stringify(data));
      }
      const pgns: string[] = data.map(item => item.pgn);
      setgames(parsePGNs(pgns, username));
    }

    getPGNs();
    if (!games) return;
    const tree = new Tree("root");
    populateTree(games, tree);
    tree.print();
  }, [])

  return (
    <div className="">

    </div>
  )
}

export default App
