import { useAppDispatch, useAppSelector } from "app/hooks";
import { logoutAsync, selectAuth } from "app/slices/authSlice";
import { getTodosAsync, selectTodos } from "app/slices/todosSlice";
import { ROUTE_PATHS } from "constants/routePaths";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoCard from "./TodoCard";

export default function MainPage() {
  const { role } = useAppSelector(selectAuth);
  const { isError, message, isLoading, data } = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // if not authorized redirect to login page
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch, navigate, role]);

  return (
    <>
      <div>MAINPage</div>
      <p>{isLoading && "Loading..."}</p>
      <div>
        <p>{isError && message}</p>
        {!isError && data.map((todo) => <TodoCard {...todo} key={todo.id} />)}
      </div>
    </>
  );
}
