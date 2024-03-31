import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    if (login) {
      fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to Login");
            alert("Failed to Login");
          }
          console.log("Login successful", response);
          alert("Login successful");

          setEmail("");
          setPassword("");
          return response.json();
        })
        .then((dt) => {
          console.log("res", dt);
          localStorage.setItem("email", dt.email);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Login error:", error);
          alert("failed");
        });
    } else {
      fetch("http://localhost:5000/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to register");
          }
          console.log("Registration successful");
          setLogin(true);
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          console.error("Registration error:", error);
          alert("failed");
        });
    }
  };

  const changeForm = () => {
    setLogin(!login);
    setEmail("");
    setPassword("");
  };

  return login ? (
    <div style={styles.container}>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={styles.button} type="submit">
          Login
        </button>
      </form>
      <p onClick={changeForm}>
        Don't have an account? <p style={styles.link}>Sign Up</p>
      </p>
    </div>
  ) : (
    <div style={styles.container}>
      <h2 style={styles.header}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            style={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={styles.button} type="submit">
          Register
        </button>
      </form>
      <p onClick={changeForm}>
        Already have an account? <p style={styles.link}>Login</p>
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    margin: "auto",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "3px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
  },
};
