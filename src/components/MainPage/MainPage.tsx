import "./MainPage.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuth } from "app/slices/authSlice";
import { getTodosAsync, selectTodos } from "app/slices/todosSlice";
import { useEffect } from "react";
import TodoCard from "../TodoCard/TodoCard";
import { showModal } from "app/slices/modalSlice";

export default function MainPage() {
  const { role } = useAppSelector(selectAuth);
  const { isError, message, isLoading, data } = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const addTodo = () => {
    dispatch(showModal({ title: "", description: "", id: 0, type: "create" }));
  };
  // if not authorized redirect to login page
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch, role]);

  return (
    <div className="mainPage">
      <div className="mainPage-title_wrapper">
        <h2 className="page-name">Main page</h2>
        <button className="btn" onClick={addTodo}>
          Create
        </button>
      </div>
      <div className="mainPage-todos_container">
        <div>{isError && message}</div>
        {!isError && data.map((todo) => <TodoCard {...todo} key={todo.id} />)}
      </div>
    </div>
  );
}
