import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { api, getErrorMessage } from "../utils/api";
import { addConnection } from "../utils/connectionSlice";
import Loader from "./Loader";
import EmptyState from "./EmptyState";
import UserListItem from "./UserListItem";

const Connection = () => {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/user/connection")
      .then((res) => dispatch(addConnection(res.data?.data || [])))
      .catch((err) => setError(getErrorMessage(err)));
  }, [dispatch]);

  if (error && !connection) {
    return (
      <div role="alert" className="alert alert-error max-w-md mx-auto">
        <span>{error}</span>
      </div>
    );
  }
  if (!connection) return <Loader />;

  if (connection.length === 0) {
    return (
      <EmptyState
        image="/noConnections.jpg.png"
        title="No connections yet"
        text="Show interest in developers on your feed. When they accept, they show up here."
      >
        <Link to="/" className="btn btn-primary">
          Go to feed
        </Link>
      </EmptyState>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-1">Connections</h1>
      <p className="text-base-content/60 mb-6">
        {connection.length} developer{connection.length === 1 ? "" : "s"} in
        your network
      </p>
      <div className="flex flex-col gap-4">
        {connection.map((conn) => (
          <UserListItem key={conn._id} user={conn}>
            <Link to={"/chat/" + conn._id} className="btn btn-primary btn-sm">
              Message
            </Link>
          </UserListItem>
        ))}
      </div>
    </div>
  );
};

export default Connection;
