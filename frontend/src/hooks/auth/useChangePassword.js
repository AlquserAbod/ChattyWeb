import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const useChangePassword = () => {
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const changePassword = async (password,confirmPassword) => {
        const success = handleInputErrors({password,confirmPassword});
        if(!success) return 

        setloading(true);
        try {
            const res = await fetch("/api/auth/change-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
                body: JSON.stringify({password, confirmPassword})
			});

            const data = await res.json();

            if(data.error) {
                throw new Error(data.error);
            }

            navigate('/');
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message)
        }finally {
            setloading(false);
        }
    }

    return { loading, changePassword}
}

export default useChangePassword

function handleInputErrors({password,confirmPassword}){
    if(!password || !confirmPassword ) {
      toast.error("Please fill in all fields");
      return false
    }
    if(password !== confirmPassword){
        toast.error("Passwords do not match");
        return false;
    }

  
    return true
}