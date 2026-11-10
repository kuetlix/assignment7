import { useEffect } from "react";
import { NavLink } from "react-router";

import { useAuth } from "../context/AuthContext";
import { useCartStore } from "../store/cartStore";
import useLocalStorage from "../hooks/useLocalStorage";

function NavBar() {
  const { user, logout } = useAuth();

  const cartCount = useCartStore((state) =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  const [theme, setTheme] = useLocalStorage(
    "ketli-theme",
    "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#5D3587" : "#8050AA",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
  });

  return (
    <nav
      aria-label="Main navigation"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        padding: "16px 24px",
        backgroundColor: "#F1E7F8",
        borderBottom: "1px solid #E5D9EE",
      }}
    >
      <NavLink
        to="/"
        style={{
          color: "#8050AA",
          fontSize: "22px",
          fontWeight: "bold",
          textDecoration: "none",
        }}
      >
        Ketli Store
      </NavLink>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <NavLink to="/" end style={linkStyle}>
          Home
        </NavLink>

        <NavLink to="/products" style={linkStyle}>
          Products
        </NavLink>

        <NavLink to="/cart" style={linkStyle}>
          Cart ({cartCount})
        </NavLink>

        {user ? (
          <>
            <span>{user.username}</span>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" style={linkStyle}>
            Login
          </NavLink>
        )}

        <button
          type="button"
          onClick={() =>
            setTheme((previous) =>
              previous === "light" ? "dark" : "light"
            )
          }
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
