import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const { user, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const destination = location.state?.from
    ? `${location.state.from.pathname}${location.state.from.search || ""}`
    : "/";

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      await login(username, password);
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  if (user) {
    return (
      <section>
        <h1>You are already logged in</h1>
        <button onClick={() => navigate("/", { replace: true })}>
          Go to Home
        </button>
      </section>
    );
  }

  return (
    <section
      style={{
        maxWidth: "420px",
        margin: "40px auto",
        padding: "32px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5D9EE",
      }}
    >
      <h1 style={{ color: "#8050AA" }}>Login to Ketli Store</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Student Email</label>

        <input
          id="username"
          type="email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          disabled={pending}
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            padding: "12px",
            margin: "8px 0 20px",
          }}
        />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={pending}
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            padding: "12px",
            margin: "8px 0 20px",
          }}
        />

        {error && (
          <p role="alert" style={{ color: "#B42318" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          style={{
            backgroundColor: "#8050AA",
            color: "#FFFFFF",
            padding: "12px 24px",
            border: "none",
            cursor: pending ? "wait" : "pointer",
          }}
        >
          {pending ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default Login;