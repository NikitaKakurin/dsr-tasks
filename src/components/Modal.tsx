import { useAppDispatch, useAppSelector } from "app/hooks";
import { hideModal, selectModal } from "app/slices/modalSlice";
import {
  createTodoAsync,
  deleteTodoAsync,
  editTodoAsync,
} from "app/slices/todosSlice";
import { MODAL_TYPE } from "constants/modalType";
import React, { useEffect, useState } from "react";

export default function Modal() {
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
    if (type === MODAL_TYPE.delete) {
      dispatch(deleteTodoAsync(id));
    }
    if (type === MODAL_TYPE.edit) {
      dispatch(
        editTodoAsync({ id, description: inputDescription, title: inputTitle })
      );
    }
    if (type === MODAL_TYPE.create) {
      dispatch(
        createTodoAsync({
          description: inputDescription,
          title: inputTitle,
        })
      );
    }
  };
  const handleCancel = () => {
    dispatch(hideModal());
  };
  return (
    <>
      {isShowModal && (
        <div className="modal-container">
          <div className="modal">
            <h3>{modalTitle}</h3>
            {(type === MODAL_TYPE.edit || type === MODAL_TYPE.create) && (
              <>
                <label htmlFor="modal__title">title</label>
                <input
                  id="modal__title"
                  value={inputTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputTitle(e.target.value)
                  }
                ></input>
                <label htmlFor="modal__description">description</label>
                <input
                  id="modal__description"
                  value={inputDescription}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputDescription(e.target.value)
                  }
                ></input>
              </>
            )}
            <div className="modal__container-btn">
              <button className="btn btn-apply" onClick={send}>
                Apply
              </button>
              <button className="btn btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}