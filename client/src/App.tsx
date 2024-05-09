import { useEffect, useState } from "react"
import fetchFromAPI from "./utils/fetchFromAPI";
import { Game, parsePGNs } from "./utils/games";
import { Tree, populateTree } from "./utils/MovesTree";

const username = "";

function App() {
  const [games, setgames] = useState<Game[] | null>(null);
  const [tree, settree] = useState<Tree | null>(null);
  const [current, setcurrent] = useState<Tree | null>(null);

  const prev = () => {
    if (!current || current?.move === "root") {
      return;
    }
    setcurrent(current?.parent);
  }

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
    settree(new Tree("root"));
    if (!tree || !games) return;
    populateTree(games, tree);
    setcurrent(tree);
    tree.print();
  }, [])

  return (
    <div className="">
      <ul className="space-y-2">
        {current?.children.map(child => (<li onClick={() => setcurrent(child)} key={child.id} className="cursor-pointer">{child.move}</li>))}
      </ul>
      <button onClick={() => prev()}>Back</button>
    </div>
  )
}

export default App
