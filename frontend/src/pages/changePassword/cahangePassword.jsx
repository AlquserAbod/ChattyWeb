import { useEffect, useState } from "react";
import useChangePassword from "../../hooks/auth/useChangePassword";

const ChangePassword = () => {
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const {loading, changePassword} = useChangePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(password, confirmPassword);
  }

  useEffect(() => {
    document.title = "ChattyWeb: change password"
  }, []);

  return (

    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding 
      backdrop-filtre backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-color-gray-300">
          Change <span className="text-blue-500">ChattyWeb</span> Password
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Password </span>
            </label>
            <input type="password" placeholder="Enter new password" className="w-full input input-bordered h-10" 
                value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text"> Confirm Password </span>
            </label>
            <input type="password" placeholder="Confirm psssword" className="w-full input input-bordered h-10" 
              value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>

          </div>

          <div>
            <button className="btn btn-block btn-sm mt-6" disabled={loading} type="submit">
              {loading ? <span className="loading loading-spinner"></span> : "Change password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword