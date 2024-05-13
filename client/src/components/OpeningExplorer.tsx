import { useEffect, useState } from "react"
import { Colour, Game } from "../utils/games";
import { Tree, populateTree } from "../utils/MovesTree";
import MoveCard from "./MoveCard";

const OpeningExplorer = ({games} : {games: Game[]}) => {
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