import { useState } from "react";

import EditProject from "../modals/EditProject";

import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, updateProject }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h2>{project.name}</h2>

          <p>
            <strong>Orçamento:</strong> R${" "}
            {Number(project.budget).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Categoria:</strong> {project.category}
          </p>
        </div>

        <div className={styles.actions}>
          <button className={styles.editButton} onClick={() => setModal(true)}>
            Editar
          </button>

          <button className={styles.deleteButton}>Excluir</button>
        </div>
      </div>

      {modal && (
        <EditProject
          project={project}
          setModal={setModal}
          updateProject={updateProject}
        />
      )}
    </>
  );
}
