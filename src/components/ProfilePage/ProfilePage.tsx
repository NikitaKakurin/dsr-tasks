import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import "./ProfilePage.css";
import { getMeAsync, selectAuth } from "app/slices/authSlice";

const ProfilePage = () => {
  const { role, name } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMeAsync());
  }, []);

  return (
    <div className="ProfilePage">
      <h2 className="page-title">Profile page</h2>
      <p>Name: {name}</p>
      <p>Role: {role as string}</p>
    </div>
  );
};

export default ProfilePage;
