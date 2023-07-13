import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import UsersPage from "./UsersPage";
import { ROUTE_PATHS } from "constants/routePaths";
import { logoutAsync, getMeAsync } from "app/slices/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { ROLE } from "constants/role";
import Modal from "./Modal";

function App() {
  const { role } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const clickToLogout = () => dispatch(logoutAsync());

  useEffect(() => {
    dispatch(getMeAsync());
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Header</h1>
        {role && (
          <button type="button" onClick={clickToLogout}>
            logout
          </button>
        )}
      </header>
      <BrowserRouter>
        <Routes>
          {/* подстановочный путь */}
          {/* <Route path={ROUTE_PATHS.main} element={<MainPage />} />
          <Route path={ROUTE_PATHS.login} element={<AuthPage />} />
          <Route path={ROUTE_PATHS.profile} element={<ProfilePage />} />
          <Route path={ROUTE_PATHS.users} element={<UsersPage />} /> */}
          <Route
            path={ROUTE_PATHS.main}
            element={
              <ProtectedRoute isAllowed={!!role}>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTE_PATHS.login}
            element={
              <ProtectedRoute isAllowed={!role} redirectPath={ROUTE_PATHS.main}>
                <AuthPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTE_PATHS.profile}
            element={
              <ProtectedRoute isAllowed={!!role && !(role === ROLE.admin)}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTE_PATHS.users}
            element={
              <ProtectedRoute isAllowed={!!role}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Modal/>
    </div>
  );
}

export default App;
