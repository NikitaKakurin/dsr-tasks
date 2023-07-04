import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import UsersPage from "./UsersPage";
import { ROUTE_PATHS } from "constants/routePaths";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Header</h1>
        <button>logout</button>
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
