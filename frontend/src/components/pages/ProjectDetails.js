import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import CreateServiceModal from "../modals/CreateServiceModal";
import EditProject from "../modals/EditProject";

import styles from "./ProjectDetails.module.css";
import DeleteServiceModal from "../modals/DeleteServiceModal";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [deleteServiceModal, setDeleteServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [serviceModal, setServiceModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    // Busca o projeto
    fetch(`http://localhost:5000/projects/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
      })
      .catch((error) => console.log(error));

    // Busca os serviços desse projeto
    fetch(`http://localhost:5000/services?projectId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.log(error));

    // Busca as categorias
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  // Enquanto o projeto não carregar
  if (!project) {
    return <p>Carregando projeto...</p>;
  }

  const category = categories.find(
    (category) => String(category.id) === String(project.category),
  );

  const categoryName = category?.name;

  const totalServices = services.reduce(
    (total, service) => total + Number(service.cost),
    0,
  );

  const remainingBudget = Number(project.budget) - totalServices;
  // Atualiza o projeto depois de editar
  function updateProject(updatedProject) {
    setProject(updatedProject);
  }
  async function deleteService() {
    if (!selectedService) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/services/${selectedService.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir serviço");
      }

      setServices((currentServices) =>
        currentServices.filter((service) => service.id !== selectedService.id),
      );

      setDeleteServiceModal(false);
      setSelectedService(null);
    } catch (error) {
      console.error(error);
      alert("Não foi possível excluir o serviço.");
    }
  }
  function openDeleteServiceModal(service) {
    setSelectedService(service);
    setDeleteServiceModal(true);
  }

  return (
    <div className={styles.container}>
      <Link to="/projects" className={styles.backButton}>
        ← Voltar para projetos
      </Link>

      {/* INFORMAÇÕES DO PROJETO */}

      <section className={styles.projectHeader}>
        <div className={styles.titleRow}>
          <h1>{project.name}</h1>

          <button
            className={styles.editButton}
            onClick={() => setEditModal(true)}
          >
            Editar Projeto
          </button>
        </div>

        <div className={styles.projectInfo}>
          {/* CATEGORIA */}

          <div className={styles.infoBox}>
            <span>Categoria</span>

            <div className={styles.category}>
              <span
                className={`${styles.categoryDot} ${
                  styles[categoryName?.toLowerCase()]
                }`}
              />

              <strong>{categoryName || "Sem categoria"}</strong>
            </div>
          </div>

          {/* ORÇAMENTO */}

          <div className={styles.infoBox}>
            <span>Orçamento</span>

            <strong>R$ {Number(project.budget).toFixed(2)}</strong>
          </div>

          {/* TOTAL GASTO */}

          <div className={styles.infoBox}>
            <span>Total gasto</span>

            <strong className={styles.total}>
              R$ {totalServices.toFixed(2)}
            </strong>
          </div>

          {/* DISPONÍVEL */}

          <div className={styles.infoBox}>
            <span>Disponível</span>

            <strong className={styles.available}>
              R$ {remainingBudget.toFixed(2)}
            </strong>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}

      <section className={styles.servicesSection}>
        <div className={styles.servicesHeader}>
          <h2>Serviços</h2>

          <button
            className={styles.addServiceButton}
            onClick={() => setServiceModal(true)}
          >
            + Adicionar Serviço
          </button>
        </div>

        <div className={styles.servicesList}>
          {services.length === 0 ? (
            <div className={styles.emptyServices}>
              <p>Este projeto ainda não possui serviços.</p>
            </div>
          ) : (
            services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceInfo}>
                  <h3>{service.name}</h3>

                  <p>{service.description}</p>
                </div>

                <div className={styles.serviceActions}>
                  <strong className={styles.serviceCost}>
                    R$ {Number(service.cost).toFixed(2)}
                  </strong>

                  <button
                    className={styles.deleteServiceButton}
                    onClick={() => openDeleteServiceModal(service)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* MODAL DE CRIAR SERVIÇO */}

      {serviceModal && (
        <CreateServiceModal
          setModal={setServiceModal}
          projectData={project}
          services={services}
          setServices={setServices}
        />
      )}

      {/* MODAL DE EDITAR PROJETO */}

      {editModal && (
        <EditProject
          project={project}
          setModal={setEditModal}
          updateProject={updateProject}
        />
      )}
      {deleteServiceModal && selectedService && (
        <DeleteServiceModal
          service={selectedService}
          setModal={setDeleteServiceModal}
          handleDelete={deleteService}
        />
      )}
    </div>
  );
}
