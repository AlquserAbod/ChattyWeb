import MessageContainer from "../../components/messages/MessageContainer"
import Sidebar from "../../components/sidebar/sidebar"

const Home = () => {
  return (
    <div className="flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding 
    backdrop-filter backdrop-blur-lg bg-opacity-0 w-full h-full max-sm:flex-col sm:ml-10 sm:mr-10">
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default Home