import Login from "../components/Login";
import ProjectsList from "../components/ProjectsList";
import { useAuth } from "../context/AuthContext";

export default function Home() {

  const { user } = useAuth();
  

  return (
    <div>      
      {user ? <ProjectsList/> :<Login/>}
    </div>
  )
}
