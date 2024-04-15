import MessageContainer from "../../components/messages/MessageContainer"
import AddFriendModal from "../../components/modals/AddFriendModal/AddFriendModal"
import ManageFriendsModal from "../../components/modals/ManageFriendsModal/ManageFriendsModal"
import NotificationsModal from "../../components/modals/NotificationsModal/NotificationsModal"
import PendingFriendShipsListModal from "../../components/modals/PendingFriendShipsListModal/PendingFriendShipsListModal"
import Sidebar from "../../components/sidebar/sidebar"
import useListenDeletedFromFriends from "../../hooks/friends/useListenDeletedFromFriends"
import useListenFriendRequest from "../../hooks/friends/useListenFriendRequest"
import useListenResponseToFriendRequest from "../../hooks/friends/useListenResponseToFriendRequest"
import useListenNotifications from "../../hooks/notifications/useListenNotifications"
import useListenMessages from "../../hooks/useListenMessages.jsx"

const Home = () => {

  useListenResponseToFriendRequest();
  useListenMessages();
  useListenFriendRequest();
  useListenNotifications();
  useListenDeletedFromFriends();
  
  return (
    <>
      <div className="flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding 
      backdrop-filter backdrop-blur-lg bg-opacity-0 w-full h-5/6 max-sm:flex-col sm:ml-10 sm:mr-10">
          <Sidebar />
          <MessageContainer />
      </div>

      <AddFriendModal />
      <ManageFriendsModal />
      <NotificationsModal />
      <PendingFriendShipsListModal />
    </>

  )
}

export default Home