// Got this key by visiting the project in Firebase, then presssing the Settings Gear
const firebaseProjectKey = "AIzaSyAlOkrrmLSXFZCuPJs6HdxQFtF4D0dLX3E";

// Async function that creates a new account to log into our Firebase site
export const createNewUser = async function (emailInput, passwordInput) {
  const createAccountData = {
    // "Request Body Payload" described in Firebase docs for the Sign Up Tutorial
    email: emailInput,
    password: passwordInput,
    returnSecureToken: true,
  };
  // Make the POST request and parse the return data regardless of whether the operation succeeds or not
  try {
    const result = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseProjectKey}`,
      {
        method: "POST",
        body: JSON.stringify(createAccountData),
        headers: { "Content-Type": "application/json" },
      }
    );
    // If operation fails, explain why using the parsed object that gets returned
    if (!result.ok) {
      const parsedResult = await result.json();
      console.log("Failed attempt. Here's why:", parsedResult);
      throw new Error(parsedResult.error.message); // enter the obj we just logged
    }
    // If operation succeeds, simply log the parsed data for now
    if (result.ok) {
      const parsedResult = await result.json();
      console.log("successful attempt:", parsedResult);
      // express that this succeeeded in some way (on a real project)
    }
  } catch (errorObj) {
    // render an error modal (on a real project)
  }
};
