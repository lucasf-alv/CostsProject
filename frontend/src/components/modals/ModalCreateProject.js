import styles from "./ModalCreateProject.module.css";

export default function ModalCreateProject({ setModal }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setModal(false)}>
          ×
        </button>

        <h2>Criar Projeto</h2>

        <p>Preencha os dados do seu projeto.</p>

        <input
          type="text"
          placeholder="Nome do projeto"
          className={styles.projectNameInput}
        />

        <button className={styles.createButton}>Criar Projeto</button>
      </div>
    </div>
  );
}
