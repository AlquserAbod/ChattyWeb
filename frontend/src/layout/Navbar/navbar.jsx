import { SearchConversation } from "../../components/SearchConversationInput/SearchConversation";
import DeleteAccountModal from "../../components/deleteAccountModal/deleteAccountModal";
import { useAuthContext } from "../../context/AuthContext"
import useLogout from "../../hooks/auth/useLogout";
import { FaUser, FaUserPlus } from "react-icons/fa";
import useFriendRequests from "../../zustand/useFriendRequests";
import { FaUserFriends } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import useNotifications from "../../zustand/useNotifications";
import useMarkAsReaded from "../../hooks/notifications/useMarkAsReaded";


const Navbar = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="navbar bg-base-100 pl-5 pr-5 max-sm:flex-col justify-between z-40 relative">
            <div className="navbar-start max-sm:text-center max-sm:justify-center max-sm:mb-7">
                <a href="/">
                    <img src="/logo.png" alt="site Logo" className="w-20 my-1" />
                </a>
            </div>
            
            <div className="navbar-end  gap-4 max-sm:justify-center max-sm:flex-col-reverse max-sm:w-full">
                    { authUser ? (
                        <>
                            <SearchConversation />
                            <div className="flex items-center gap-4 max-sm:flex-wrap-reverse max-sm:justify-center">
                                
                                <FriendRequestsDropdown authUser={authUser} />

                                <ManageFriendsButton />

                                <AddFriendButton />
                                
                                < NotificationsDropdown />

                                <ProfileDropdown authUser={authUser} />

                            </div>
                        </>
                    ) : <RegisterLogin />}

            </div>
        </div>
    )
}

const ProfileDropdown = ({ authUser }) => {

    const {loading, logout} = useLogout();

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
                <div className="w-10 rounded-full">
                    <img alt="Profile Pic" src={authUser.profilePic} />
                </div>
            </div>

            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52  max-xs:w-auto">
                <li className=" mb-2"> <span> Hello {authUser.fullName } :</span></li>
                <div className="divider mt-0 mb-2"></div> 
                <li><a href="/update-profile">update profile</a></li>
                <li><a href="/change-password">change password</a></li>
                <li onClick={()=>document.getElementById('delete-account-modal').showModal()}><a href="#">delete Account</a></li>
                { !loading ? (
                    <li onClick={logout}><a>Logout</a></li>
                ) : (
                    <span className="loading loading-spinner"></span>
                )}
            </ul>
            
            <DeleteAccountModal />
        </ div>
    )
}

const NotificationsDropdown = () => {
    const { unReadedNotificationsCount } = useNotifications();
    const { markAsReaded } = useMarkAsReaded();

    return (
            <div className="indicator cursor-pointer" onClick={() => {
                document.getElementById('notifications_modal').showModal();
                markAsReaded();
            }}>
                <IoMdNotifications  className="h-5 w-5" />

                {unReadedNotificationsCount > 0 &&  (
                    <span className="badge badge-sm badge-error indicator-item">{unReadedNotificationsCount}</span>
                )}
            </div> 

    )
}


const AddFriendButton = () => {
    return (
        <div className="cursor-pointer" onClick={() => {
            document.getElementById('add_friend_modal').showModal();
        }}>
            <FaUserPlus  className="h-5 w-5" />
        </div>
    )
}

const ManageFriendsButton = () => {
    return (
        <div className="cursor-pointer" onClick={() => {
            document.getElementById('manage_friends_modal').showModal();
        }}>
            <FaUserFriends  className="h-5 w-5" />
        </div>
    )
}

const FriendRequestsDropdown = () => {
    const { friendRequests } = useFriendRequests();

    return (
        <div className="indicator cursor-pointer" onClick={() => {
            document.getElementById('pending_friendships_modal').showModal();
        }}>
            <FaUser  className=" w-5" />
            {friendRequests.length > 0 &&  (
                <span className="badge badge-sm badge-error indicator-item">{friendRequests.length}</span>

            )}
        </div> 
    )
}

const RegisterLogin = () => {
    return (
        <div>
            <div tabIndex={0} className="flex list-none justify-between gap-2">
                <li><a href="/signup">Sign up</a></li>
                <li> / </li>
                <li><a href="/login">Login</a></li>

            </div>
        </ div>
    )
}


export default Navbar