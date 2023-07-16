import "./Page404.css";
import { Link } from "react-router-dom";

const Page404 = () => (
  <div className="Page404">
    <h2 className="Page404__title">404</h2>
    <p className="Page404__text">
      Oops! Looks like you followed a bad link. If you think this is a problem
      with us, please tell us.
    </p>
    <Link to={"/"}>Back to main page</Link>
  </div>
);

export default Page404;
