import { useEffect, useState } from "react"
import fetchFromAPI from "./utils/fetchFromAPI";
import { Colour, Game, parsePGNs } from "./utils/games";
import { Tree, populateTree } from "./utils/MovesTree";

const username = "";

function App() {
  const [games, setgames] = useState<Game[] | null>(null);
  const [tree, settree] = useState<Tree | null>(null);
  const [current, setcurrent] = useState<Tree | null>(null);
  const [colour, setcolour] = useState<Colour>("white");

  const prev = () => {
    if (!current || current?.move === "root") {
      return;
    }
    setcurrent(current?.parent);
  }

  useEffect(() => {
    const tree = new Tree("root");
    if (!tree || !games) return;
    
    const newGames = games.filter(game => game.colour === colour);
    populateTree(newGames, tree);

    settree(tree);
    setgames(newGames);
    setcurrent(tree);
  }, [colour])

  useEffect(() => {
    const fetchGames = async () => {
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
    fetchGames();
  }, [])

  return (
    <div className="">
      <select value={colour} onChange={(e) => setcolour(e.target.value as Colour)}>
        <option value="white">White</option>
        <option value="black">Black</option>
      </select>
      <ul className="space-y-2">
        {current?.children.map(child => (<li onClick={() => setcurrent(child)} key={child.id} className="cursor-pointer">{child.move}</li>))}
      </ul>
      <button onClick={() => prev()}>Back</button>
    </div>
  )
}

export default App
