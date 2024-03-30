import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useUpdateProfile = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const updateProfile = async ({fullName,username,gender}) => {
    const success = handleInputErrors({fullName,username,gender});

    if(!success) return;

    setloading(true);

    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({fullName,username,gender})
      });
      
      const data = await res.json();

      if(data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user",JSON.stringify(data))
      setAuthUser(data);

      navigate('/')
      toast.success('Profile updated successfully')

    } catch (error) {
      toast.error(error.message);
    }finally {
      setloading(false);
    }
  }
  
  return { loading, updateProfile }


}

export default useUpdateProfile

function handleInputErrors({fullName,username,gender}){
  if(!fullName || !username || !gender) {
    toast.error("Please fill in all fields");
    return false
  }

  return true
}