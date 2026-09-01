import { useState } from "react";

import EditProject from "../modals/EditProject";
import DeleteProjectModal from "../modals/DeleteProjectModal";
import { useNavigate } from "react-router-dom";

import styles from "./ProjectCard.module.css";

export default function ProjectCard({
  project,
  categories,
  updateProject,
  deleteProject,
}) {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  const category = categories.find(
    (category) => String(category.id) === String(project.category),
  );
  async function handleDeleteProject() {
    const response = await fetch(
      `http://localhost:5000/projects/${project.id}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      deleteProject(project.id);
      setDeleteModal(false);
    }
  }

  const categoryName = category?.name;

  return (
    <>
      <div
        className={styles.card}
        onClick={() => navigate(`/projects/${project.id}`)}
      >
        <h2>{project.name}</h2>

        <p>Orçamento: R$ {project.budget}</p>

        <div className={styles.category}>
          <span
            className={`${styles.categoryDot} ${
              styles[categoryName?.toLowerCase()]
            }`}
          ></span>

          <span>{categoryName}</span>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.editButton}
            onClick={(event) => {
              event.stopPropagation();
              setModal(true);
            }}
          >
            Editar
          </button>

          <button
            className={styles.deleteButton}
            onClick={(event) => {
              event.stopPropagation();
              setDeleteModal(true);
            }}
          >
            Excluir
          </button>
        </div>
      </div>

      {modal && (
        <EditProject
          project={project}
          setModal={setModal}
          updateProject={updateProject}
        />
      )}

      {deleteModal && (
        <DeleteProjectModal
          project={project}
          setModal={setDeleteModal}
          handleDelete={handleDeleteProject}
        />
      )}
    </>
  );
}
