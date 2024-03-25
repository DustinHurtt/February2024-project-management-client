import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, Link } from "react-router-dom";

import { get } from "../services/authService";

import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

function ProjectDetailsPage(props) {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  const { user } = useContext(AuthContext);

  const getProject = () => {
    get(`/projects/details/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      {user && project && user._id === project.owner && (
        <AddTask refreshProject={getProject} projectId={projectId} />
      )}

      {project &&
        project.tasks.map((task) => <TaskCard key={task._id} {...task} />)}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      {user && project && user._id === project.owner && (
        <Link to={`/projects/edit/${projectId}`}>
          <button>Edit Project</button>
        </Link>
      )}
    </div>
  );
}

export default ProjectDetailsPage;
