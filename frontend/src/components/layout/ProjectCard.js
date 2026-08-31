import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project }) {
  return (
    <div className={styles.card}>
      <h2>{project.name}</h2>

      <p>Orçamento: R$ {project.budget}</p>

      <p>Categoria: {project.category}</p>

      <div className={styles.actions}>
        <button className={styles.editButton}>Editar projeto</button>

        <button className={styles.deleteButton}>Excluir projeto</button>
      </div>
    </div>
  );
}
