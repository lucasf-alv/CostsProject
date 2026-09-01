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

    const serviceCost = Number(cost);

    // Soma tudo que já foi gasto no projeto
    const totalServices = services.reduce(
      (total, service) => total + Number(service.cost),
      0,
    );

    // Soma o que já foi gasto + o novo serviço
    const newTotal = totalServices + serviceCost;

    // Verifica se ultrapassa o orçamento
    if (newTotal > Number(projectData.budget)) {
      setError("O custo deste serviço ultrapassa o orçamento disponível.");

      return;
    }

    const service = {
      projectId: projectData.id,
      name: name,
      cost: serviceCost,
      description: description,
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

      // Adiciona o novo serviço na lista da página
      setServices((currentServices) => [...currentServices, createdService]);

      setSuccess(true);

      // Fecha o modal depois de 2 segundos
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
              <input
                type="text"
                placeholder="Nome do serviço"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Custo do serviço"
                value={cost}
                onChange={(event) => setCost(event.target.value)}
                min="0"
                step="0.01"
                required
              />

              <textarea
                placeholder="Descrição do serviço"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />

              {error && <p className={styles.error}>{error}</p>}

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
