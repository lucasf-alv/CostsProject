import { useEffect, useState } from "react";

import ProjectCard from "../layout/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
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

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Meus Projetos</h1>

      <div>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>
    </div>
  );
}
