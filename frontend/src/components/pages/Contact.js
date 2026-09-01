import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Informe seu nome.";
    }

    if (!email.trim()) {
      newErrors.email = "Informe seu e-mail.";
    } else if (!email.includes("@")) {
      newErrors.email = "O e-mail deve conter @.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Informe um e-mail válido.";
    }

    if (!message.trim()) {
      newErrors.message = "Digite uma mensagem.";
    }

    setErrors(newErrors);

    // Se existir algum erro, não envia
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Aqui futuramente você pode enviar para uma API
    setSuccess(true);

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className={styles.container}>
      <div className={styles.contactCard}>
        {!success ? (
          <>
            <h1>Entre em contato</h1>

            <p className={styles.subtitle}>
              Tem alguma dúvida ou sugestão? Envie uma mensagem para nós.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label htmlFor="name">Nome</label>

                <input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);

                    if (errors.name) {
                      setErrors((current) => ({
                        ...current,
                        name: "",
                      }));
                    }
                  }}
                  className={errors.name ? styles.invalid : ""}
                />

                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="email">E-mail</label>

                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (errors.email) {
                      setErrors((current) => ({
                        ...current,
                        email: "",
                      }));
                    }
                  }}
                  className={errors.email ? styles.invalid : ""}
                />

                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Mensagem</label>

                <textarea
                  id="message"
                  placeholder="Digite sua mensagem"
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);

                    if (errors.message) {
                      setErrors((current) => ({
                        ...current,
                        message: "",
                      }));
                    }
                  }}
                  className={errors.message ? styles.invalid : ""}
                />

                {errors.message && (
                  <span className={styles.error}>{errors.message}</span>
                )}
              </div>

              <button type="submit" className={styles.submitButton}>
                Enviar mensagem
              </button>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>

            <h2>Mensagem enviada!</h2>

            <p>Obrigado pelo contato. Sua mensagem foi enviada com sucesso.</p>

            <button
              className={styles.newMessageButton}
              onClick={() => setSuccess(false)}
            >
              Enviar outra mensagem
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
