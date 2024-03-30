import { SearchConversation } from "../../components/SearchConversationInput/SearchConversation";
import DeleteAccountModal from "../../components/deleteAccountModal/deleteAccountModal";
import { useAuthContext } from "../../context/AuthContext"
import useLogout from "../../hooks/auth/useLogout";


const Navbar = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="navbar bg-base-100 pl-5 pr-5 max-sm:flex-col justify-between">
            <div className="navbar-start max-sm:text-center max-sm:justify-center max-sm:mb-7">
                <div>
                    <a className="btn btn-ghost text-2xl" href="/">Chatty Web</a>
                </div>
            </div>
            
            <div className="navbar-end gap-2 max-sm:justify-center ">
                <SearchConversation />
                <div className="dropdown dropdown-end">
                    { authUser ? <ProfileSettings authUser={authUser} /> : <RegisterLogin />}

                </div>
            </div>
        </div>
    )
}

const ProfileSettings = ({ authUser }) => {

    const {loading, logout} = useLogout();

    return (
        <>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src={authUser.profilePic} />
                    </div>

            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
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
        </>

    )
}

const RegisterLogin = () => {
    return (
        <>
            <div tabIndex={0} className="flex list-none justify-between gap-2">
                <li><a href="/signup">Sign up</a></li>
                <li> / </li>
                <li><a href="/login">Login</a></li>

            </div>
        </>
    )
}


export default Navbar