import MessageContainer from "../../components/messages/MessageContainer"
import Sidebar from "../../components/sidebar/sidebar"

const Home = () => {
  return (
    <div className="flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding 
    backdrop-filter backdrop-blur-lg bg-opacity-0
    sm:h-[450px] md:h[550px]">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home