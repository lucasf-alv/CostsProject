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
          />
        ))}
      </div>
    </div>
  );
}
