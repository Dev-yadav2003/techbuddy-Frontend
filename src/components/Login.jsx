import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/appSlice";
import { removeFeed } from "../utils/feedSlice";
import { Navigate } from "react-router-dom";
import { api, getErrorMessage } from "../utils/api";

const Login = () => {
  const user = useSelector((store) => store.user);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  // Leave this page once logged in. New users go straight to their profile
  // to fill it in.
  if (user) return <Navigate to={isLogin ? "/" : "/profile"} replace />;

  const validate = () => {
    if (!emailId || !password) return "Email and password are required";
    if (!isLogin) {
      if (!firstName || !lastName) return "All fields are required";
      if (firstName.trim().length < 2 || lastName.trim().length < 2) {
        return "Names must be at least 2 characters";
      }
      if (password.length < 8) return "Password must be at least 8 characters";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    setError(validationError);
    if (validationError) return;

    setLoading(true);
    try {
      const res = isLogin
        ? await api.post("/login", { emailId, password })
        : await api.post("/signUp", { firstName, lastName, emailId, password });
      dispatch(addUser(res.data.user));
      dispatch(removeFeed());
    } catch (err) {
      setError(
        getErrorMessage(err, isLogin ? "Login failed" : "Signup failed"),
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">
            {isLogin ? "Welcome back" : "Join TechBuddy"}
          </h1>
          <p className="text-base-content/60 mt-1">
            {isLogin
              ? "Log in to find and chat with developers."
              : "Create an account and start connecting."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card bg-base-100 shadow-xl border border-base-300"
          noValidate
        >
          <div className="card-body gap-4">
            {error && (
              <div role="alert" className="alert alert-error py-2 text-sm">
                <span>{error}</span>
              </div>
            )}

            {!isLogin && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="form-control">
                  <span className="label-text font-medium mb-1">
                    First name
                  </span>
                  <input
                    type="text"
                    value={firstName}
                    autoComplete="given-name"
                    className="input input-bordered"
                    placeholder="Jane"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control">
                  <span className="label-text font-medium mb-1">Last name</span>
                  <input
                    type="text"
                    value={lastName}
                    autoComplete="family-name"
                    className="input input-bordered"
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
            )}

            <label className="form-control">
              <span className="label-text font-medium mb-1">Email</span>
              <input
                type="email"
                value={emailId}
                autoComplete="email"
                className="input input-bordered"
                placeholder="you@example.com"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control">
              <span className="label-text font-medium mb-1">Password</span>
              <input
                type="password"
                value={password}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="input input-bordered"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogin && (
                <span className="label-text-alt text-base-content/60 mt-1">
                  At least 8 characters
                </span>
              )}
            </label>

            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={loading}
            >
              {loading && <span className="loading loading-spinner"></span>}
              {isLogin ? "Log in" : "Create account"}
            </button>

            <p className="text-center text-sm text-base-content/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="link link-primary ml-1"
                onClick={switchMode}
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
