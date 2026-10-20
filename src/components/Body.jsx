import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api, getErrorMessage } from "../utils/api";
import { addUser } from "../utils/appSlice";
import Footer from "./Footer";
import Loader from "./Loader";

// Layout for every logged-in page. Loads the current user first and sends
// the visitor to /login when the session is missing or expired.
const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const fetchProfile = useCallback(async () => {
    setError("");
    try {
      const res = await api.get("/profile/view");
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login", { replace: true });
      } else {
        setError(getErrorMessage(err, "Failed to load your profile"));
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user) fetchProfile();
  }, [user, fetchProfile]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-8 py-8">
        {user ? (
          <Outlet />
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div role="alert" className="alert alert-error max-w-md">
              <span>{error}</span>
            </div>
            <button className="btn btn-primary" onClick={fetchProfile}>
              Try again
            </button>
          </div>
        ) : (
          <Loader />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Body;
