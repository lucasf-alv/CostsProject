import { useEffect, useState } from "react";
import ProjectCard from "../layout/ProjectCard";
import styles from "./Project.module.css";
import ModalCreateProject from "../modals/ModalCreateProject";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [createProjectModal, setCreateProjectModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:5000/categories")
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function updateProject(updatedProject) {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );
  }

  function deleteProject(projectId) {
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== projectId),
    );
  }

  return (
    <div>
      <h1>Meus Projetos</h1>
      <button onClick={() => setCreateProjectModal(true)}>Criar Projeto</button>
      {createProjectModal && (
        <ModalCreateProject setModal={setCreateProjectModal} />
      )}

      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          categories={categories}
          updateProject={updateProject}
          deleteProject={deleteProject}
        />
      ))}
    </div>
  );
}
