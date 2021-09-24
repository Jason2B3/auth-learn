import { Link } from "react-router-dom";
import { useCustomContext } from "../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  //# Render JSX conditionally on the navbar depending on our login status
  //% Signing up successfully also logs you in, since Firebase returns an identical payload anyway
  const { isLoggedIn } = useCustomContext(); // fr/ context file

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <> 
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

//# Only render the Login <Link> when we're not already logged in
//# Only render the Profile <Link> when we are currently logged in

export default MainNavigation;
