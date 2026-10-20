import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api, getErrorMessage } from "../utils/api";
import { addRequests, removeRequest } from "../utils/requestSlice";
import Loader from "./Loader";
import EmptyState from "./EmptyState";
import UserListItem from "./UserListItem";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  const reviewRequest = async (status, _id) => {
    setBusyId(_id);
    setError("");
    try {
      await api.post(`/request/review/${status}/${_id}`);
      dispatch(removeRequest(_id));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyId(null);
    }
  };

  useEffect(() => {
    api
      .get("/user/request")
      .then((res) => dispatch(addRequests(res.data?.data || [])))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading && requests.length === 0) return <Loader />;

  return (
    <div className="max-w-3xl mx-auto">
      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {requests.length === 0 ? (
        <EmptyState
          image="/noRequestFound.webp"
          title="No pending requests"
          text="When someone is interested in connecting with you, they show up here."
        />
      ) : (
        <>
          <h1 className="text-3xl font-extrabold mb-1">Requests</h1>
          <p className="text-base-content/60 mb-6">
            {requests.length} developer{requests.length === 1 ? "" : "s"} want
            to connect with you
          </p>
          <div className="flex flex-col gap-4">
            {requests.map((request) => (
              <UserListItem key={request._id} user={request.fromUserId}>
                <button
                  className="btn btn-outline btn-error btn-sm"
                  disabled={busyId === request._id}
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success btn-sm"
                  disabled={busyId === request._id}
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </UserListItem>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Requests;
