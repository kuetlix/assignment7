import { Outlet } from "react-router";
function Layout() {
  return (
    <div className="app-layout">
      <header>
        <h1>Online Shop</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Web Programming - Assignment 7</p>
      </footer>
    </div>
  );
}
export default Layout;