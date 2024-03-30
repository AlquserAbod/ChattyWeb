import Conversations from "./Conversations"

const Sidebar = () => {
  return (
    <div className="border-r max-sm:border-r-0 max-sm:border-b border-slate-500 p-4 flex flex-col overflow-auto max-sm:h-1/4">

      <Conversations />
      
    </div>
  )
}

export default Sidebar