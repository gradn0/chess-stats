import OpeningExplorer from "./OpeningExplorer"

const Dashboard = () => {
  return (
    <div className="bg-darkGrey size-full p-[1em]">
      <div className="bg-grey p-[1em] mx-auto w-[min(100%,25em)] sm:w-[40em] lg:w-[60em] rounded-lg">
        <OpeningExplorer />
      </div>
      
    </div>
  )
}

export default Dashboard