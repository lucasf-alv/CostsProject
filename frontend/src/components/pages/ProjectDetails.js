import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!project) {
    return <p>Carregando projeto...</p>;
  }

  return (
    <div>
      <h1>{project.name}</h1>

      <p>Orçamento: R$ {project.budget}</p>

      <p>Categoria: {project.category}</p>
    </div>
  );
}
