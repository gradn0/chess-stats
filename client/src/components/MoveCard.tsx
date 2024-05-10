import { Tree } from "../utils/MovesTree"

const MoveCard = ({treeNode, handleNext}: {treeNode: Tree, handleNext: () => void}) => {
  const white = Math.floor(treeNode.winners.white / treeNode.gamesPlayed * 100);
  const black = Math.floor(treeNode.winners.black / treeNode.gamesPlayed * 100);
  const drawrate = 100 - (white + black);
  return (
    <div className="cursor-pointer flex gap-4 text-sm" onClick={handleNext}> 
      <p className="w-[5em]">{treeNode.move}</p>
      <p className="w-[3em] text-gray-400">{treeNode.gamesPlayed}</p>
      <div className="w-[20em] h-[1.6em] bg-slate-300 flex">
        <p style={{width: `${white}%`}} className="bg-white text-black flex justify-center items-center">{white >  10 ? `${white}%` : " "}</p>
        <p style={{width: `${drawrate}%`}} className="bg-[#5d5c5a] text-white flex justify-center items-center">{drawrate > 10 ? `${drawrate}%` : " "}</p>
        <p style={{width: `${black}%`}} className="bg-[#3c3b39] text-white flex justify-center items-center">{black >  10 ? `${black}%` : " "}</p>
      </div>
    </div>
  )
}

export default MoveCard