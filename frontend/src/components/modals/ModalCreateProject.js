import { useState, useEffect } from "react";
import styles from "./ModalCreateProject.module.css";

export default function ModalCreateProject({ setModal }) {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    // =========================
    // VALIDAÇÃO
    // =========================

    if (!name.trim()) {
      setError("Preencha o nome do projeto.");
      return;
    }

    if (!budget || Number(budget) <= 0) {
      setError("Informe um orçamento válido.");
      return;
    }

    if (!category) {
      setError("Selecione uma categoria.");
      return;
    }

    // =========================
    // CRIA PROJETO
    // =========================

    const project = {
      name: name.trim(),
      budget: Number(budget),
      category: category,
    };

    try {
      const response = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar projeto");
      }

      setSuccess(true);

      setTimeout(() => {
        setModal(false);
        window.location.href = "/projects";
      }, 2000);
    } catch (error) {
      console.error(error);
      setError("Não foi possível criar o projeto.");
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
        {!success ? (
          <>
            <button
              className={styles.closeButton}
              onClick={() => setModal(false)}
            >
              ×
            </button>

            <h2>Criar Projeto</h2>

            <p>Preencha os dados do seu projeto.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              {/* NOME */}
              <input
                type="text"
                placeholder="Nome do projeto"
                className={`${styles.projectNameInput} ${
                  !name.trim() && error ? styles.invalid : ""
                }`}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              {/* ORÇAMENTO */}
              <input
                type="number"
                placeholder="Insira o orçamento total"
                className={`${styles.budgetInput} ${
                  (!budget || Number(budget) <= 0) && error
                    ? styles.invalid
                    : ""
                }`}
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                min="0"
                step="0.01"
              />
              {/* CATEGORIA */}
              <select
                className={`${styles.categorySelect} ${
                  !category && error ? styles.invalid : ""
                }`}
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

              {/* MENSAGEM DE ERRO */}
              {error && <p className={styles.error}>⚠ {error}</p>}

              <button className={styles.createButton} type="submit">
                Criar Projeto
              </button>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>

            <h2>Projeto criado com sucesso!</h2>

            <p>Seu projeto foi cadastrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
