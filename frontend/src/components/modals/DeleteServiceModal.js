import styles from "./DeleteServiceModal.module.css";

export default function DeleteServiceModal({
  service,
  setModal,
  handleDelete,
}) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setModal(false)}>
          ×
        </button>

        <h2>Excluir serviço</h2>

        <p>
          Tem certeza que deseja excluir o serviço{" "}
          <strong>{service.name}</strong>?
        </p>

        <p className={styles.warning}>Essa ação não poderá ser desfeita.</p>

        <div className={styles.actions}>
          <button
            className={styles.cancelButton}
            onClick={() => setModal(false)}
          >
            Cancelar
          </button>

          <button className={styles.deleteButton} onClick={handleDelete}>
            Excluir serviço
          </button>
        </div>
      </div>
    </div>
  );
}
