import ProjectInitiation from "../components/project/ProjectInicialization";
import { useAuth } from "../context/AuthContext";
import { InitProjectContextProvider } from "../context/InitProjectContext";

const CreateProject  = () => {

    const { user } = useAuth();

    return <>
        {
            user &&
            <InitProjectContextProvider projectOwner={user.email}>
                <ProjectInitiation />
            </InitProjectContextProvider>
        }
    </>
}

export default CreateProject