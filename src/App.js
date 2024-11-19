import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import PostDetailsPage from "./Components/PostDetailsPage";
import PostsByUserPage from "./Components/PostsByUserPage";
import PostsListPage from "./Components/PostsListPage";
import "./App.css";
const App = () => {
  return (
    <Router>
      <nav style={{ display: "flex", justifyContent: "space-between",width: "50%",margin:"auto" }}>

        <Link style={{ color: "red" }} to="/">Posts by User</Link>

        <br />
        <br />
        <Link style={{ color: "red" }} to="/posts">Posts List</Link>

      </nav>
      <br />
      <Routes>
        <Route path="/" element={<PostsByUserPage />} />
        <Route path="/posts" element={<PostsListPage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
