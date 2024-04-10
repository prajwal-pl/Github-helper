import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ExplorePage from "./pages/ExplorePage";
import LikesPage from "./pages/LikesPage";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/Auth.Context";

function App() {
  const { authUser, loading } = useAuthContext();
  console.log("Authenticated User: ", authUser);

  if (loading) return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-100 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/explore"
            element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/likes"
            element={authUser ? <LikesPage /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
