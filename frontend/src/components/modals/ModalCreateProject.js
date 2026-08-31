import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ModalCreateProject.module.css";

export default function ModalCreateProject({ setModal }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const project = {
      name: name,
      budget: Number(budget),
      category: category,
    };

    const response = await fetch("http://localhost:5000/projects", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(project),
    });

    if (response.ok) {
      setModal(false);
      navigate("/projects");
    }
  }

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

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do projeto"
            className={styles.projectNameInput}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <input
            type="number"
            placeholder="Insira o orçamento total"
            className={styles.budgetInput}
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
          />

          <select
            className={styles.categorySelect}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
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
