import { Switch, Route, Redirect } from "react-router-dom";
import { useCustomContext } from "./components/store/auth-context";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
function App() {
  // Context file's variable that tells if we're logged in or not:
  const { isLoggedIn } = useCustomContext();
  //% LOGIC FOR PROTECTING CERTAIN PAGES (in notes)
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {isLoggedIn && <UserProfile />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>
        //% If someone tries to search a protected URL without being logged in,
        redirect to path "/"
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <h1> isLoggedIn: {String(isLoggedIn)}</h1>
    </Layout>
  );
}
export default App;

//% TEST WHILE NOT LOGGED IN: should all lead to the login/auth page

// http://localhost:3000/FFFFF      <HomePage /> b/c redirect
// http://localhost:3000/profile    <AuthPage /> b/c its protected
//% TEST WHILE LOGGED IN:
// http://localhost:3000        <HomePage />
// http://localhost:3000/profile  <UserProfile /> b/c we now have access

// http://localhost:3000/auth
// <AuthPage /> for now because we lose our login status when we search for new URL's (as of commit 308)
// this should not be the case in commit 309
