import styles from "./DeleteProjectModal.module.css";

export default function DeleteProjectModal({
  project,
  setModal,
  handleDelete,
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setModal(false)}>
          ×
        </button>

        <h2>Excluir projeto</h2>

        <p>
          Tem certeza que deseja excluir o projeto
          <strong> "{project.name}"</strong>?
        </p>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={() => setModal(false)}
          >
            Cancelar
          </button>

          <button className={styles.deleteButton} onClick={handleDelete}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
