import { Provider } from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connection from "./components/Connection";
import Requests from "./components/Requests";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import createStore from "./utils/appStore";
import Chat from "./components/Chat";

function App() {
  return (
    <Provider store={createStore}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connection />} />
            <Route path="chat/:targetUserId" element={<Chat />} />
            <Route path="requests" element={<Requests />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
