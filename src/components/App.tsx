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
import Page404 from "./Page404/Page404";

function App() {
  const {
    role,
    isLoading: isLoadingAuth,
    loadingText: loadingTextAuth,
  } = useAppSelector(selectAuth);
  const {
    isLoading: isLoadingTodos,
    isError: isErrorTodos,
    message: errorMessageTodos,
    loadingText: loadingTextError,
  } = useAppSelector(selectTodos);
  const { isLoading: isLoadingUsers, loadingText: loadingTextUser } =
    useAppSelector(selectUsers);
  const [loadingText, setLoadingText] = useState("");

  useEffect(() => {
    if (isLoadingAuth) setLoadingText(loadingTextAuth);
    if (isLoadingTodos) setLoadingText(loadingTextError);
    if (isLoadingUsers) setLoadingText(loadingTextUser);
  }, [
    isLoadingAuth,
    isLoadingTodos,
    isLoadingUsers,
    loadingTextAuth,
    loadingTextError,
    loadingTextUser,
  ]);

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
        <Route path="*" element={<Page404 />}></Route>
      </Routes>
      <Modal isError={isErrorTodos} errorMessage={errorMessageTodos} />
    </div>
  );
}

export default App;
