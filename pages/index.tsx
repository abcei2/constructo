import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";
import { getAllCategories, getAllProjects } from "../db/project";

export default function Home() {

  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(()=>{
    if(user)
      router.replace("/create")    
    
  }, [user, router])

  return (
    <div>      
      {user ? undefined :<Login/>}
    </div>
  )
}
