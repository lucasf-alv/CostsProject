import { useEffect, useState } from "react";

import styles from "./EditProject.module.css";

export default function EditProject({ project, setModal, updateProject }) {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState(project.name);
  const [budget, setBudget] = useState(project.budget);
  const [category, setCategory] = useState(project.category);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((resp) => resp.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedProject = {
      name: name,
      budget: Number(budget),
      category: category,
    };

    const response = await fetch(
      `http://localhost:5000/projects/${project.id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedProject),
      },
    );

    if (response.ok) {
      const updatedProject = await response.json();

      updateProject(updatedProject);
      setSuccess(true);

      setTimeout(() => {
        setModal(false);
      }, 2000);
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {!success ? (
          <>
            <button
              className={styles.closeButton}
              onClick={() => setModal(false)}
            >
              ×
            </button>

            <h2>Editar Projeto</h2>

            <p>Altere os dados do seu projeto.</p>

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
                Salvar alterações
              </button>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>

            <h2>Projeto atualizado com sucesso!</h2>

            <p>As alterações foram salvas.</p>
          </div>
        )}
      </div>
    </div>
  );
}
