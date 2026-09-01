import styles from "./Company.module.css";

export default function Company() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Sobre a <span>Costs</span>
          </h1>

          <p>
            A Costs é uma plataforma criada para facilitar o gerenciamento
            financeiro de projetos, permitindo que você acompanhe seus
            orçamentos, serviços e gastos de forma simples e organizada.
          </p>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.aboutCard}>
          <h2>Quem somos?</h2>

          <p>
            Somos uma empresa focada em desenvolver soluções simples e
            eficientes para ajudar pessoas e empresas a organizarem seus
            projetos.
          </p>

          <p>
            Com a Costs, você consegue cadastrar projetos, definir orçamentos,
            adicionar serviços e acompanhar quanto já foi gasto e quanto ainda
            está disponível.
          </p>
        </div>

        <div className={styles.aboutCard}>
          <h2>Nosso objetivo</h2>

          <p>
            Nosso objetivo é tornar o gerenciamento de projetos mais
            transparente e fácil, permitindo que você tenha uma visão clara dos
            seus custos.
          </p>

          <p>
            Queremos transformar informações financeiras em uma experiência
            simples, visual e fácil de entender.
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <h2>Nossos valores</h2>

        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.icon}>✓</div>
            <h3>Simplicidade</h3>
            <p>
              Criamos ferramentas fáceis de usar, sem complicações
              desnecessárias.
            </p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.icon}>◆</div>
            <h3>Organização</h3>
            <p>
              Ajudamos você a manter seus projetos e custos sempre organizados.
            </p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.icon}>★</div>
            <h3>Eficiência</h3>
            <p>
              Desenvolvemos soluções para tornar o gerenciamento mais rápido e
              eficiente.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
