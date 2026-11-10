import { Link } from "react-router";

function NotFound(){
  return (
    <section>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <Link to="/">Back to Home</Link>
    </section>
  );
}
export default NotFound;
