/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import SearchInput from "../AddFriendModal/SearchInput"
import FriendUser from "./FriendUser";
import useGetFriends from "../../../hooks/friends/useGetFriends";

const ManageFriendsModal = () => {
  const [search, setSearch] = useState('');
  const { friends } = useGetFriends();
  const [ filteredFriends, setfilteredFriends ] = useState([]);

  useEffect(() => {
    if(search.length < 3) return  setfilteredFriends(friends)

    setfilteredFriends(filteredFriends.filter(friend => friend.username.toLowerCase().startsWith(search.toLowerCase())));
  },[friends, search])


  return (
    <dialog id="manage_friends_modal" className="modal modal-bottom sm:modal-middle z-20">
        <div className="modal-box">
          <SearchInput  search={search} setSearch={setSearch}/>

          <div className="divider"></div>

          {filteredFriends.length > 0 ? filteredFriends.map((user, index) => (
            <FriendUser 
              friend={user} key={index} 
              lastIdx={index === friends.length - 1}
            />
          )) : (
            <div className="text-center font-bold">
              {friends.length <= 0 
                ? "This application does not have any users yet" : `There are no users. It starts with "${search}"`}
              
            </div>
          )}
        
        </div>

        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>

    </dialog>
  )
}

export default ManageFriendsModal
