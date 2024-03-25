import { useState, useEffect } from "react";

import { get } from "../services/authService";

import ProjectCard from "../components/ProjectCard";
import AddProject from "../components/AddProject";



function ProjectListPage() {
  const [projects, setProjects] = useState([]);

  const getAllProjects = () => {
    get('/projects')
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="ProjectListPage">
      <AddProject refreshProjects={getAllProjects} />

      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  );
}

export default ProjectListPage;
