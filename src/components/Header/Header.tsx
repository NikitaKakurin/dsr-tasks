import "./Header.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { logoutAsync } from "app/slices/authSlice";
import { ROLE } from "constants/role";
import { Link } from "react-router-dom";

export default function Header() {
  const { role } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const clickToLogout = () => dispatch(logoutAsync());

  return (
    <header className="app-header">
      <h1>
        <Link to="/">Todos</Link>
      </h1>
      <nav className="navigation">
        {role && (
          <Link className="btn" to="/profile">
            Profile
          </Link>
        )}
        {role === ROLE.admin && (
          <Link className="btn" to="/users">
            Users
          </Link>
        )}
        {role && (
          <button type="button" className="btn" onClick={clickToLogout}>
            logout
          </button>
        )}
      </nav>
    </header>
  );
}
