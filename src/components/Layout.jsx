import { Outlet } from "react-router";
import NavBar from "./NavBar";
function Layout() {
  return (
    <div
      className="app-layout"
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F9F5FC",
        color: "#222222",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          padding: "16px 32px",
          backgroundColor: "#F1E7F8",
          borderBottom: "1px solid #E5D9EE",
        }}
      >
        <h1
          style={{
            color: "#8050AA",
            fontSize: "26px",
            fontWeight: "700",
            margin: 0,
          }}
        >
          Ketli Store
        </h1>

        <NavBar />
      </header>
      <main
        style={{
          flex: 1,
          width: "100%",
          boxSizing: "border-box",
          padding: "32px",
        }}
      >
        <Outlet />
      </main>
      <footer
        style={{
          padding: "20px 16px",
          textAlign: "center",
          backgroundColor: "#F1E7F8",
          borderTop: "1px solid #E5D9EE",
          color: "#665A70",
          fontSize: "14px",
        }}
      >
        <p style={{ margin: 0 }}>
          © 2026 Ketli Store. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
export default Layout;