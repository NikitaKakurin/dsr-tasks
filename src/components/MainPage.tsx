import { useAppSelector } from "app/hooks";
import { ROUTE_PATHS } from "constants/routePaths";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const { role } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (!role) navigate(ROUTE_PATHS.login);
  }, [navigate, role]);
  return (
    <>
      <div>MAINPage</div>
    </>
  );
}
