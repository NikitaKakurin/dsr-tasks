import "./TodoCard.css";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { ITodo } from "../../models/dbTypes";
import { selectAuth } from "app/slices/authSlice";
import { ROLE } from "constants/role";
import { showModal } from "app/slices/modalSlice";

export default function TodoCard({ title, description, id, createdBy }: ITodo) {
  const { role, name } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const isAllowed = () => role === ROLE.admin || role === createdBy;
  const editTodo = () => {
    if (!isAllowed()) return;
    dispatch(showModal({ title, description, id, type: "edit" }));
  };
  const deleteTodo = () => {
    if (!isAllowed()) return;
    dispatch(showModal({ title, description, id, type: "delete" }));
  };
  return (
    <div key={id} className="todo">
      <h3 className="todo__title">{title}</h3>
      <p className="todo__description">{description}</p>
      <p className="todo__createdBy"> Author: {createdBy}</p>
      {isAllowed() && (
        <div className="todo__btn_container">
          <button type="button" className="btn btn-orange" onClick={editTodo}>
            Edit
          </button>
          <button type="button" className="btn btn-red" onClick={deleteTodo}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
