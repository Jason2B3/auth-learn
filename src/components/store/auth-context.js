import { useState, createContext,useCallback, useContext, useEffect } from "react"; // import useContext
const AAA = createContext();
export const useCustomContext = () => useContext(AAA); // export custom hook

//% OBJECTIVE 1: Maintain authorized state when we reload the page
//$ OBJECTIVE 2: Automatically logout after X amount of time
//# OBJECTIVE 3: Only use a token if there is a remaining duration for that token

//$ Variable's set equal to an expression that logs us out after a timed delay
let logoutTimer; // must be on global scope

export default function AuthContextProvider(props) {
  // Grab token data from localStorage
  const tokenData = retrieveStoredToken(); // equals {token, timeLeft} or null
  let initialToken;
  if (tokenData) initialToken = tokenData.token;

  //% OBJECTIVE 1: Use localStorage to maintain useState values on reload
  const [token, setToken] = useState(initialToken); // equals undefined or an auth token on startup
  const isLoggedIn = !!token; // true if we have a token, false if token is undefined/falsy

  //$ OBJECTIVE 2: Give your logout method an auto-logout feature after X amount of time
  const logout = useCallback(() => {
    // Update state variables and the localStorage KVP's so they reflect us logging out
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    //$ End the countdown if we manually logout before the countdown finishes
    if (logoutTimer) clearTimeout(logoutTimer); // points to setTimeout in login()
  }, []); // don't need this function to ever change or get redefined

  const login = (idToken, expirationTime) => {
    // Update state variables and the localStorage KVP's to reflect us logging in
    setToken(idToken);
    localStorage.setItem("token", idToken); // save token provided as an arg
    //# Save Unix time when token expires
    localStorage.setItem("expirationTime", expirationTime);

    //$ Auto logout the user after expirationTime has passed
    const timeLeft = calcTimeLeft(expirationTime);
    logoutTimer = setTimeout(logout, timeLeft);
    // logoutTimer = setTimeout(logout, 5000); can choose to log user out earlier
  }; // expirationTime must be a Unix timestamp set X amount of time in the future (ms)
  // must set a new timer when we reload the page and need to stay logged in

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.timeLeft);
      logoutTimer = setTimeout(logout, tokenData.timeLeft);
    }
  }, [tokenData, logout]);

  const distribution = {
    token, // auth token value
    isLoggedIn,
    login, // login by setting isLoggedIn to true
    logout, // logout by setting isLoggedIn to false
  };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}


//# OBJECTIVE 3: Log in only when the idToken is valid
// This function decides whether the auth token is still valid or not
// valid → returns token and timeLeft  || invalid → returns null
// We get the token value using this at the start of our AuthContextProvider ƒ()
function retrieveStoredToken() {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  // ▲ future Unix time defined at time of initial login (may or may not be past this point now)
  const timeLeft = calcTimeLeft(storedExpirationTime);
  // If timeLeft is below 1 min, remove token and expirationTime from Storage
  if (timeLeft <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }
  // If we made it past the if check, we must still be authorized
  // return the token and time remaining
  return {
    token: storedToken,
    timeLeft: timeLeft,
  };
} // the output of this function will be an object, or null

function calcTimeLeft(expirationTime) {
  const currentTime = new Date().getTime(); // current Unix time (ms)
  const adjExpirationTime = new Date(expirationTime).getTime(); // future Unix time (ms)
  const timeLeft = adjExpirationTime - currentTime; // future time - current time
  return timeLeft;
}

//@  Trick: Use double negatives to turn strings, numbers, truthy's, and falsy's into Booleans
//@  !!"string" and !!8   (equals true )
//@  !!"" and !!undefined   (equal false)
