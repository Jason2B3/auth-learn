import { useState, createContext, useContext } from "react"; // import useContext
const AAA = createContext();
export const useCustomContext = () => useContext(AAA); // export custom hook

export default function AuthContextProvider(props) {
  //~ States and functions Managing Login Status
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  // Functions related to updating the idToken's value
  const defineAuthToken = (str) => setToken(str);
  const expireAuthToken = () => setToken(null);
  const distribution = {
    isLoggedIn,
    login, // login by setting isLoggedIn to true
    logout, // logout by setting isLoggedIn to false
    token, // auth token value
    defineAuthToken, // set token equal to idToken from Firebase
    expireAuthToken, // set token equal to nothing
  };
  return <AAA.Provider value={distribution}>{props.children}</AAA.Provider>;
}
