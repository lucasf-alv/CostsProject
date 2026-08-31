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
        <form className={styles.form}>
          <input
            type="text"
            placeholder="Nome do projeto"
            className={styles.projectNameInput}
          />
          <input
            type="number"
            placeholder="Insira o orçamento total"
            className={styles.budgetInput}
          />
          <select className={styles.categorySelect}>
            <option value="">Selecione a categoria</option>
            <option value="design">Design</option>
            <option value="development">Desenvolvimento</option>
            <option value="marketing">Marketing</option>
          </select>

          <button className={styles.createButton} type="submit">
            Criar Projeto
          </button>
        </form>
      </div>
    </div>
  );
}
