import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import UsersPage from "./UsersPage";
import { ROUTE_PATHS } from "constants/routePaths";
import { logout } from "app/slices/authSlice";
import { useAppDispatch } from "app/hooks";

function App() {
  const dispatch = useAppDispatch();
  const clickToLogout = () => dispatch;
  return (
    <div className="app">
      <header className="app-header">
        <h1>Header</h1>
        <button type="button" onClick={clickToLogout}>logout</button>
      </header>
      <BrowserRouter>
        <Routes>
          {/* подстановочный путь */}
          <Route path={ROUTE_PATHS.main} element={<MainPage />} />
          <Route path={ROUTE_PATHS.login} element={<AuthPage />} />
          <Route path={ROUTE_PATHS.profile} element={<ProfilePage />} />
          <Route path={ROUTE_PATHS.users} element={<UsersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
