import { NavLink } from "react-router";
function NavBar(){
  const getLinkStyle = ({ isActive }) => ({
    color: isActive ? "#8050AA" : "#333333",
    fontWeight: isActive ? "600" : "400",
    textDecoration: isActive ? "underline" : "none",
    textUnderlineOffset: "6px",
    padding: "8px 4px",
    transition: "color 0.2s ease",
  });
  return(
    <nav
      aria-label="Main navigation"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "16px 24px",
      }}
    >
      <NavLink to="/" end style={getLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/products" style={getLinkStyle}>
        Products
      </NavLink>
      <NavLink to="/cart" style={getLinkStyle}>
        Cart
      </NavLink>
      <NavLink to="/login" style={getLinkStyle}>
        Login
      </NavLink>
    </nav>
  );
}
export default NavBar;