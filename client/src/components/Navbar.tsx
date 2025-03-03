import { Link } from "react-router-dom";
import { useAuth } from "../utils/Auth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to={isAuthenticated ? "/home" : "/"}>My App</Link>
      </h1>

      <div>
        {isAuthenticated ? (
          <>
            <Link to="/home" className="mr-4">
              Home
            </Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
