import "./Modal.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { hideModal, selectModal } from "app/slices/modalSlice";
import {
  cleanErrorTodo,
  createTodoAsync,
  deleteTodoAsync,
  editTodoAsync,
} from "app/slices/todosSlice";
import { MODAL_TYPE } from "constants/modalType";
import React, { useEffect, useState } from "react";

interface IProps {
  isError: boolean;
  errorMessage: string;
}

export default function Modal({ isError, errorMessage }: IProps) {
  const { id, isShowModal, title, type, description } =
    useAppSelector(selectModal);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  let modalTitle = "";
  switch (type) {
    case MODAL_TYPE.create:
      modalTitle = "Create Todo";
      break;
    case MODAL_TYPE.delete:
      modalTitle = "Delete Todo?";
      break;
    case MODAL_TYPE.edit:
      modalTitle = "Edit Todo";
      break;
  }

  useEffect(() => {
    setInputDescription(description);
    setInputTitle(title);
  }, [title, description]);

  const dispatch = useAppDispatch();
  const send = () => {
    switch (type) {
      case MODAL_TYPE.delete:
        dispatch(deleteTodoAsync(id));
        break;
      case MODAL_TYPE.edit:
        dispatch(
          editTodoAsync({
            id,
            description: inputDescription,
            title: inputTitle,
          })
        );
        break;
      case MODAL_TYPE.create:
        dispatch(
          createTodoAsync({
            description: inputDescription,
            title: inputTitle,
          })
        );
        break;
    }
  };
  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) {
      dispatch(hideModal());
      dispatch(cleanErrorTodo());
    }
  };
  return (
    <>
      {isShowModal && (
        <div className="modal-container" onClick={handleCancel}>
          <div className="modal">
            {isError && (
              <div className="error-message">
                {errorMessage}, please try again
              </div>
            )}
            <h3 className="modal__action_title">{modalTitle}</h3>
            {(type === MODAL_TYPE.edit || type === MODAL_TYPE.create) && (
              <>
                <label htmlFor="modal__title">Title:</label>
                <input
                  id="modal__title"
                  value={inputTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputTitle(e.target.value)
                  }
                  maxLength={25}
                ></input>

                <label htmlFor="modal__description">Description:</label>
                <textarea
                  id="modal__description"
                  value={inputDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setInputDescription(e.target.value)
                  }
                  rows={5}
                  maxLength={100}
                ></textarea>
              </>
            )}
            <div className="modal__container-btn">
              <button className="btn btn-apply btn-green" onClick={send}>
                Apply
              </button>
              <button className="btn btn-cancel btn-red" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
