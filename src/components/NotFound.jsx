import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";

const NotFound = () => (
  <EmptyState
    title="Page not found"
    text="The page you are looking for does not exist."
  >
    <Link to="/" className="btn btn-primary">
      Back to feed
    </Link>
  </EmptyState>
);

export default NotFound;
