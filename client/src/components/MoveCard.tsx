import { Tree } from "../utils/MovesTree"

const MoveCard = ({treeNode, handleNext}: {treeNode: Tree, handleNext: () => void}) => {
  const winrate = Math.floor(treeNode.record.wins / treeNode.gamesPlayed * 100);
  const loserate = Math.floor(treeNode.record.losses / treeNode.gamesPlayed * 100);
  const drawrate = 100 - (winrate + loserate);
  return (
    <div className="cursor-pointer flex gap-4 text-sm" onClick={handleNext}> 
      <p className="w-[5em]">{treeNode.move}</p>
      <p className="w-[3em] text-gray-400">{treeNode.gamesPlayed}</p>
      <div className="w-[20em] h-[1.6em] bg-slate-300 flex">
        <p style={{width: `${winrate}%`}} className="bg-white text-black flex justify-center items-center">{winrate >  10 ? `${winrate}%` : " "}</p>
        <p style={{width: `${drawrate}%`}} className="bg-[#5d5c5a] text-white flex justify-center items-center">{drawrate > 10 ? `${drawrate}%` : " "}</p>
        <p style={{width: `${loserate}%`}} className="bg-[#3c3b39] text-white flex justify-center items-center">{loserate >  10 ? `${loserate}%` : " "}</p>
      </div>
    </div>
  )
}

export default MoveCard