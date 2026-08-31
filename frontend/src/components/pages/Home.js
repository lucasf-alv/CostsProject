import styles from "./Home.module.css";
import porco from "../img/porco.jpg";
import { Link } from "react-router-dom";
import LinkButton from "../layout/LinkButton";
import ModalCreateProject from "../modals/ModalCreateProject";
import { useState } from "react";
export default function Home() {
  const [modal, setModal] = useState(false);
  return (
    <div className={styles.homeContainer}>
      <h1>
        Bem-Vindo ao <span>Costs</span>
      </h1>
      <p>Comece a gerenciar seus projetos agora mesmo!!!</p>
      <button
        className={styles.criarProjetoButton}
        onClick={() => setModal(true)}
      >
        Criar Projeto
      </button>
      {modal && <ModalCreateProject setModal={setModal} />}
      <img src={porco} alt="Costs" />
    </div>
  );
}
