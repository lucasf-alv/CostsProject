import { use } from "react";
import styles from "./ModalCreateProject.module.css";
import { useState, useEffect } from "react";
export default function ModalCreateProject({ setModal }) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);
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
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button className={styles.createButton} type="submit">
            Criar Projeto
          </button>
        </form>
      </div>
    </div>
  );
}
