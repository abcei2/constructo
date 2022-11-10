import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";

export default function Home() {

  const { user } = useAuth();
  return (
    <div >
      
      {user ? user.name :<Login/>}
    </div>
  )
}
