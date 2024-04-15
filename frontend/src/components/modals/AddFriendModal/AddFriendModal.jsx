/* eslint-disable react-hooks/exhaustive-deps */
import {  useState } from "react";
import SearchInput from "./SearchInput"
import useGetUsers from "../../../hooks/users/useGetUsers";
import AddFriendUser from "./AddFriendUser";

const AddFriendModal = () => {
  const [search,setSearch] = useState('');
  const { users } = useGetUsers();
  

  return (
    <>
    <dialog id="add_friend_modal" className="modal modal-bottom sm:modal-middle z-20">
        <div className="modal-box">
          <SearchInput  search={search} setSearch={setSearch}/>

          <div className="divider"></div>

          {users.map((user, index) => (
            <AddFriendUser 
              user={user} key={index} 
              lastIdx={index === users.length - 1}
            />
          ))}
        </div>

        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>

    </dialog>
    </>
  )
}

export default AddFriendModal
