"use client";

import { useEffect } from "react";

const styles = {
  html: {
    minHeight: "100%",
    background: "#030b0c",
    colorScheme: "dark",
  },

  body: {
    minHeight: "100vh",
    margin: 0,
    background: "#030b0c",
    color: "#f3efe5",
    fontFamily:
      "Arial, Helvetica, sans-serif",
  },

  main: {
    position: "relative",
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "32px 16px",
    background:
      "radial-gradient(circle at 50% 18%, rgba(216,182,106,0.12), transparent 34%), #030b0c",
    boxSizing: "border-box",
  },

  card: {
    position: "relative",
    width: "100%",
    maxWidth: "560px",
    overflow: "hidden",
    border: "1px solid rgba(216,182,106,0.2)",
    borderRadius: "30px",
    background: "rgba(3,11,12,0.96)",
    boxShadow: "0 32px 100px rgba(0,0,0,0.64)",
  },

  content: {
    padding: "34px 28px 28px",
    textAlign: "center",
  },

  icon: {
    display: "flex",
    width: "58px",
    height: "58px",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    border: "1px solid rgba(216,182,106,0.26)",
    borderRadius: "18px",
    background: "rgba(216,182,106,0.1)",
    color: "#f3d98d",
    fontSize: "28px",
    fontWeight: 700,
  },

  eyebrow: {
    margin: "22px 0 0",
    color: "rgba(216,182,106,0.78)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
  },

  title: {
    margin: "14px 0 0",
    color: "#f3d98d",
    fontSize: "28px",
    lineHeight: 1.2,
    letterSpacing: "-0.04em",
  },

  text: {
    maxWidth: "430px",
    margin: "18px auto 0",
    color: "rgba(243,239,229,0.68)",
    fontSize: "14px",
    lineHeight: 1.8,
  },

  digest: {
    margin: "16px 0 0",
    color: "rgba(243,239,229,0.34)",
    fontSize: "10px",
    lineHeight: 1.6,
    letterSpacing: "0.12em",
    wordBreak: "break-all",
    textTransform: "uppercase",
  },

  actions: {
    display: "grid",
    gap: "10px",
    padding: "0 28px 28px",
  },

  primaryButton: {
    minHeight: "48px",
    border: "1px solid rgba(216,182,106,0.55)",
    borderRadius: "16px",
    background: "#d8b66a",
    color: "#07110f",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },

  secondaryLink: {
    display: "flex",
    minHeight: "46px",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(216,182,106,0.2)",
    borderRadius: "16px",
    background: "rgba(0,0,0,0.22)",
    color: "#d8b66a",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textDecoration: "none",
    textTransform: "uppercase",
  },
};

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="ru" style={styles.html}>
      <head>
        <title>Ошибка | APIDARB</title>
      </head>

      <body style={styles.body}>
        <main style={styles.main}>
          <section style={styles.card}>
            <div style={styles.content}>
              <div style={styles.icon} aria-hidden="true">
                !
              </div>

              <p style={styles.eyebrow}>
                Системная ошибка
              </p>

              <h1 style={styles.title}>
                Приложение временно недоступно
              </h1>

              <p style={styles.text}>
                Произошла ошибка при запуске страницы. Попробуйте загрузить
                приложение ещё раз.
              </p>

              {error?.digest && (
                <p style={styles.digest}>
                  Код ошибки: {error.digest}
                </p>
              )}
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                onClick={reset}
                style={styles.primaryButton}
              >
                Попробовать снова
              </button>

              <a href="/" style={styles.secondaryLink}>
                Вернуться на главную
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}