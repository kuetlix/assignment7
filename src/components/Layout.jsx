import { Outlet } from "react-router";
import NavBar from "./NavBar";

function Layout() {
  return (
    <div
      className="store-layout"
      style={{
        width: "100%",
        maxWidth: "1400px",
        minHeight: "100vh",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <NavBar />
      </header>

      <main
        style={{
          flex: 1,
          padding: "32px 24px",
        }}
      >
        <Outlet />
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          borderTop: "1px solid #E5D9EE",
          color: "#8050AA",
        }}
      >
        © 2026 Ketli Store. All rights reserved.
      </footer>
    </div>
  );
}

export default Layout;