import "./UsersPage.css";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getUsersAsync, selectUsers } from "app/slices/usersSlice";
import React, { useEffect } from "react";

export default function UsersPage() {
  const { users } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUsersAsync());
  });
  return (
    <>
      <div>UsersPage</div>
      <div>
        {users.map((user) => {
          return (
            <>
              <p>{user.name}</p>
              <p>{user.role}</p>
            </>
          );
        })}
      </div>
    </>
  );
}
