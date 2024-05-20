/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useState } from "react";
import SearchInput from "./SearchInput"
import useGetUsers from "../../../hooks/users/useGetUsers";
import AddFriendUser from "./AddFriendUser";

const AddFriendModal = () => {
  const [search,setSearch] = useState('');
  const { users } = useGetUsers();
  const [ filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if(search.length < 3) return  setFilteredUsers(users)

    setFilteredUsers(users.filter(user => user.username.toLowerCase().startsWith(search.toLowerCase())));
  },[users, search])

  return (
    <>
    <dialog id="add_friend_modal" className="modal modal-bottom sm:modal-middle z-20">
        <div className="modal-box">
          <SearchInput  search={search} setSearch={setSearch}/>

          <div className="divider"></div>

          {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
            <AddFriendUser 
              user={user} key={index} 
              lastIdx={index === users.length - 1}
            />
            
          )) : (
            <div className="text-center font-bold">
              {users.length <= 0 
                ? "You don't have any friends" : `There are no friends. It starts with "${search}"`}
              
            </div>
          )}
        </div>

        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>

    </dialog>
    </>
  )
}

export default AddFriendModal
