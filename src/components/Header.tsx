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
      <h1>Header</h1>
      {role === ROLE.admin && <Link to="/users">Users</Link>}
      {role && (
        <button type="button" onClick={clickToLogout}>
          logout
        </button>
      )}
    </header>
  );
}
