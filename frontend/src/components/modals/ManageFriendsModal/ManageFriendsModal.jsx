import { useState } from "react"
import SearchInput from "../AddFriendModal/SearchInput"
import FriendUser from "./FriendUser";
import useGetFriends from "../../../hooks/friends/useGetFriends";

const ManageFriendsModal = () => {
  const [search, setSearch] = useState('');
  const { friends } = useGetFriends();


  return (
    <dialog id="manage_friends_modal" className="modal modal-bottom sm:modal-middle z-20">
        <div className="modal-box">
          <SearchInput  search={search} setSearch={setSearch}/>

          <div className="divider"></div>

          {friends.map((user, index) => (
            <FriendUser 
              friend={user} key={index} 
              lastIdx={index === friends.length - 1}
            />
          ))}
        </div>

        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>

    </dialog>
  )
}

export default ManageFriendsModal
