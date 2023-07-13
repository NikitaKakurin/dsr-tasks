import { useAppSelector, useAppDispatch } from "app/hooks";
import { ITodo } from "../models/dbTypes";
import { selectAuth } from "app/slices/authSlice";
import { ROLE } from "constants/role";
import { showModal } from "app/slices/modalSlice";

export default function TodoCard({ title, description, id, createdBy }: ITodo) {
  const { role, name } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const isAllowed = () => role === ROLE.admin || name === createdBy;
  const editTodo = () => {
    if (!isAllowed()) return;
    dispatch(showModal({ title, description, id, type: "edit" }));
  };
  const deleteTodo = () => {
    if (!isAllowed()) return;
    dispatch(showModal({ title, description, id, type: "delete" }));
  };
  return (
    <div key={id}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{createdBy}</p>
      <button type="button" onClick={editTodo}>
        Edit
      </button>
      <button type="button" onClick={deleteTodo}>
        Delete
      </button>
    </div>
  );
}
