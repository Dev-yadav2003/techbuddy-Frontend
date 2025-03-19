import { Provider } from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import createStore from "./utils/appStore";

function App() {
  return (
    <div>
      <Provider store={createStore}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Body />}
            >
              <Route
                path="/"
                element={<Feed />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
