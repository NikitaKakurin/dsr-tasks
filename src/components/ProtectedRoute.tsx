import { ROUTE_PATHS } from "constants/routePaths";
import { Navigate } from "react-router-dom";

interface IProps {
  isAllowed: boolean;
  redirectPath?: ROUTE_PATHS[keyof ROUTE_PATHS];
  children: JSX.Element;
}
const ProtectedRoute = ({
  isAllowed,
  redirectPath = ROUTE_PATHS.login,
  children,
}: IProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath as string} replace />;
  }

  return children;
};

export default ProtectedRoute;
