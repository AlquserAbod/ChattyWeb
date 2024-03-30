import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

const useLogout = () => {
    const [loading, setloading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const logout = async () => {
        setloading(true)

        try {
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
            
            const data = await res.json();
            
            if(data.error) {
                console.log('error');
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user");

        

            setAuthUser(null);

        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }finally {
            setloading(false);
        }
    }

    return { loading, logout }
}

export default useLogout