import { useEffect, useState } from "react"
import fetchFromAPI from "../utils/fetchFromAPI";
import { Colour, Game, parsePGNs } from "../utils/games";
import { Tree, populateTree } from "../utils/MovesTree";
import MoveCard from "./MoveCard";

const username = "";

const OpeningExplorer = () => {
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
        console.log("fetching");
        
        localStorage.setItem("data", JSON.stringify(apiData.games));
        data = apiData.games;
      }
      
      const pgns: string[] = data.map(item => item.pgn);
      setgames(parsePGNs(pgns, username));
    }
    fetchGames();
  }, [])

  useEffect(() => {
    genTrees();
  }, [games])

  return (
    <div className="space-y-6 text-body">
      <div className="flex">
        <h2 className="text-heading font-semibold">Opening Explorer</h2>
        <select className="p-2 ml-auto bg-darkGrey rounded-[8px] border-none" value={colour} onChange={(e) => toggleColour(e.target.value as Colour)}>
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
      </div>
      <ul className="space-y-2 lg:space-y-3 h-[25em] overflow-y-auto">
        {current?.children.map((child: Tree) => 
          <MoveCard key={child.id} treeNode={child} handleNext={() => setcurrent(child)}/>
        )}
      </ul>
      <button onClick={() => prev()}>Back</button>
    </div>
  )
}

export default OpeningExplorer