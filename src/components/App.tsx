import { Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage/AuthPage";
import MainPage from "./MainPage/MainPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import UsersPage from "./UsersPage/UsersPage";
import { ROUTE_PATHS } from "constants/routePaths";
import { getMeAsync, selectAuth } from "app/slices/authSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect, useState } from "react";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { ROLE } from "constants/role";
import Modal from "./Modal/Modal";
import Header from "./Header/Header";
import Spinner from "./Spinner/Spinner";
import { selectTodos } from "app/slices/todosSlice";
import { selectUsers } from "app/slices/usersSlice";

function App() {
  const { role, isLoading: isLoadingAuth } = useAppSelector(selectAuth);
  const {
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    message: errorMessageTodos,
  } = useAppSelector(selectTodos);
  const { isLoading: isLoadingUsers } = useAppSelector(selectUsers);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    if (isLoadingAuth) setLoadingText("Authorization...");
    if (isLoadingTodos) setLoadingText("Loading todos...");
    if (isLoadingUsers) setLoadingText("Loading users...");
  }, [isLoadingAuth, isLoadingTodos, isLoadingUsers]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMeAsync());
  }, []);

  return (
    <div className="app">
      <Header />
      <Spinner
        isLoading={isLoadingAuth || isLoadingTodos || isLoadingUsers}
        loadingText={loadingText}
      />

      <Routes>
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
      <Modal isError={isErrorTodos} errorMessage={errorMessageTodos} />
    </div>
  );
}

export default App;
