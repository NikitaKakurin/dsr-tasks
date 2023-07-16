import "./UsersPage.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getUsersAsync, selectUsers } from "app/slices/usersSlice";
import { useEffect } from "react";

export default function UsersPage() {
  const { users, isError, message: errorMessage } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsersAsync());
  }, []);
  return (
    <>
      <h2 className="page-name">Users page</h2>
      {isError && <div className={`error-message`}>{errorMessage}</div>}
      <div className="users">
        {!isError &&
          users.map((user, index) => {
            return (
              <div className="user-card" key={user.name}>
                <div className="user-number">{index + 1}</div>
                <div className="user-info">
                  <div>Name: {user.name}</div>
                  <div>Role: {user.role}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
