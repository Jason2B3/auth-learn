//% Async function that changes the account password
const changePassword = async function (idToken, password) {
  const firebaseProjectKey = "AIzaSyAlOkrrmLSXFZCuPJs6HdxQFtF4D0dLX3E";
  const link = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseProjectKey}`;

  const requestBodyPayload = {
    idToken, // use parameters for the payload
    password,
    returnSecureToken: false,
  };
  // Make the POST request
  try {
    const result = await fetch(link, {
      method: "POST",
      body: JSON.stringify(requestBodyPayload),
      headers: { "Content-Type": "application/json" },
    });
    // If operation fails
    if (!result.ok) throw new Error("Password change failed"); // enter the obj we just logged
    // If operation succeeds
    if (result.ok) {
      console.log("Password change complete!");
      return await result.json();
    }
  } catch (errorObj) {
    // render an error modal (on a real project)
  }
};
export default changePassword;
