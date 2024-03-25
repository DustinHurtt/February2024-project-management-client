import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { get, put, axiosDelete } from "../services/authService";

function EditProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const { projectId } = useParams();

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description };
    
    put(`/projects/update/${projectId}`, requestBody)
    .then((response) => {
      navigate(`/projects/${projectId}`);
    })
    .catch((error) => {
      setErrorMessage(error.response.data.message)
      console.log(error)});
  };
  
  const deleteProject = () => {
    axiosDelete(`/projects/delete/${projectId}`)
    .then(() => {
      navigate("/projects");
    })
    .catch((err) => {
      setErrorMessage(err.response.data.message)
      console.log(err)});
  };

  useEffect(() => {
    get(`/projects/details/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
  }, [projectId]);

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default EditProjectPage;
