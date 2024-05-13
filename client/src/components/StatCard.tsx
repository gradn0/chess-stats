const StatCard = ({stat, name}: {stat: any, name: string}) => {
  const {win, loss, draw} = stat.record;
  const total = win + loss + draw;
  return (
    <div className="bg-grey rounded-lg p-3">
      <p className=" text-xl font-bold">{name}: <span className="font-bold">{stat.last.rating}</span></p>
      <p className=" text-lg">Best: <span>{stat.best.rating}</span></p>
      <p className=" text-lg w-full">Record: 
        <span className="text-accLightGreen"> {Math.floor(win/total*100)}% </span> /
        <span className="text-accRed"> {Math.floor(loss/total*100)}%</span></p>
    </div>
  )
}

export default StatCard