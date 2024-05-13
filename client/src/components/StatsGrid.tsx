import StatCard from "./StatCard"

const StatsGrid = ({stats}: {stats: any}) => {
  console.log(stats);
  
  return (
    <div className="grid gap-[1em] auto-rows-auto sm:grid-cols-2 lg:grid-cols-3">
      {stats.chess_daily && <StatCard stat={stats.chess_daily} name="Daily"/>}
      {stats.chess_rapid && <StatCard stat={stats.chess_rapid} name="Rapid"/>}
      {stats.chess_blitz && <StatCard stat={stats.chess_blitz} name="Blitz"/>}
      {stats.chess_bullet && <StatCard stat={stats.chess_bullet} name="Bullet"/>}
    </div>
  )
}

export default StatsGrid