import { Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import UsersPage from "./UsersPage";
import { ROUTE_PATHS } from "constants/routePaths";
import { getMeAsync } from "app/slices/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { ROLE } from "constants/role";
import Modal from "./Modal";
import Header from "./Header";

function App() {
  const { role } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMeAsync());
  }, []);

  return (
    <div className="app">
      <Header />

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
            <ProtectedRoute isAllowed={!!role}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTE_PATHS.users}
          element={
            <ProtectedRoute isAllowed={!!role && role === ROLE.admin}>
              <UsersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Modal />
    </div>
  );
}

export default App;
