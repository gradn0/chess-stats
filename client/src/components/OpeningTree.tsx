import { useEffect, useState } from "react"
import fetchFromAPI from "../utils/fetchFromAPI";
import { Colour, Game, parsePGNs } from "../utils/games";
import { Tree, populateTree } from "../utils/MovesTree";
import MoveCard from "./MoveCard";

const username = "";

const OpeningTree = () => {
  const [games, setgames] = useState<Game[] | null>(null);
  const [current, setcurrent] = useState<Tree | null>(null);
  const [colour, setcolour] = useState<Colour>("white");
  const [whiteTree, setwhiteTree] = useState<Tree | null>();
  const [blackTree, setblackTree] = useState<Tree | null>();

  const prev = () => {
    if (!current || current?.move === "root") {
      return;
    }
    setcurrent(current?.parent);
  }

  const toggleColour = (colour: Colour) => {
    if (!blackTree || !whiteTree) return;
    if (colour === "white") {
      setcurrent(whiteTree);
    } else {
      setcurrent(blackTree);
    }
    setcolour(colour);
  }

  const genTrees = () => {
    const whiteTree = new Tree("root");
    const blackTree = new Tree("root");
    if (!whiteTree || !blackTree || !games) return;
    
    const whiteGames = games.filter(game => game.colour === "white");
    populateTree(whiteGames, whiteTree);

    const blackGames = games.filter(game => game.colour === "black");
    populateTree(blackGames, blackTree);

    setwhiteTree(whiteTree);
    setblackTree(blackTree)
    setcurrent(whiteTree);
  }

  useEffect(() => {
    const fetchGames = async () => {
      let rawData = localStorage.getItem("data");
      let data: any[];
      if (rawData) {
        data = JSON.parse(rawData);
      } else {
        const apiData = await fetchFromAPI(`${username}/games/2024/05`);
        localStorage.setItem("data", JSON.stringify(apiData.games));
        data = apiData.games;
      }
      
      const pgns: string[] = data.map(item => item.pgn);
      setgames(parsePGNs(pgns, username));
    }
    fetchGames();
    genTrees();
  }, [])

  return (
    <div className="space-y-4">
      <select className="p-2" value={colour} onChange={(e) => toggleColour(e.target.value as Colour)}>
        <option value="white">White</option>
        <option value="black">Black</option>
      </select>
      <ul className="space-y-2 border-neutral-700 border-[1px] rounded-lg p-3 h-[20em] overflow-y-auto">
        {current?.children.map((child: Tree) => 
          <MoveCard key={child.id} treeNode={child} handleNext={() => setcurrent(child)}/>
        )}
      </ul>
      <button onClick={() => prev()}>Back</button>
    </div>
  )
}

export default OpeningTree