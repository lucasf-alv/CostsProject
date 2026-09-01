import { useState } from "react";

import styles from "./CreateServiceModal.module.css";

export default function CreateServiceModal({
  setModal,
  projectData,
  services,
  setServices,
}) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submitService(event) {
    event.preventDefault();

    setError("");

    // =========================
    // VALIDAÇÃO
    // =========================

    if (!name.trim()) {
      setError("Preencha o nome do serviço.");
      return;
    }

    if (!cost || Number(cost) <= 0) {
      setError("Informe um custo válido para o serviço.");
      return;
    }

    if (!description.trim()) {
      setError("Preencha a descrição do serviço.");
      return;
    }

    const serviceCost = Number(cost);

    // =========================
    // VERIFICA ORÇAMENTO
    // =========================

    const totalServices = services.reduce(
      (total, service) => total + Number(service.cost),
      0,
    );

    const newTotal = totalServices + serviceCost;

    if (newTotal > Number(projectData.budget)) {
      setError("O custo deste serviço ultrapassa o orçamento disponível.");
      return;
    }

    // =========================
    // CRIA SERVIÇO
    // =========================

    const service = {
      projectId: projectData.id,
      name: name.trim(),
      cost: serviceCost,
      description: description.trim(),
    };

    try {
      const response = await fetch("http://localhost:5000/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar serviço");
      }

      const createdService = await response.json();

      // Atualiza a lista de serviços da página
      setServices((currentServices) => [...currentServices, createdService]);

      setSuccess(true);

      // Fecha o modal
      setTimeout(() => {
        setModal(false);
      }, 2000);
    } catch (error) {
      console.error(error);

      setError("Não foi possível criar o serviço.");
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

            <h2>Adicionar Serviço</h2>

            <p>Adicione um novo serviço ao projeto.</p>

            <form className={styles.form} onSubmit={submitService}>
              {/* NOME */}
              <input
                type="text"
                placeholder="Nome do serviço"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={!name.trim() && error ? styles.invalid : ""}
              />

              {/* CUSTO */}
              <input
                type="number"
                placeholder="Custo do serviço"
                value={cost}
                onChange={(event) => setCost(event.target.value)}
                className={
                  (!cost || Number(cost) <= 0) && error ? styles.invalid : ""
                }
                min="0"
                step="0.01"
              />

              {/* DESCRIÇÃO */}
              <textarea
                placeholder="Descrição do serviço"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className={!description.trim() && error ? styles.invalid : ""}
              />

              {/* ERRO */}
              {error && <p className={styles.error}>⚠ {error}</p>}

              {/* BOTÕES */}
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setModal(false)}
                >
                  Cancelar
                </button>

                <button type="submit" className={styles.createButton}>
                  Adicionar Serviço
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>

            <h2>Serviço criado com sucesso!</h2>

            <p>O serviço foi adicionado ao projeto.</p>
          </div>
        )}
      </div>
    </div>
  );
}
