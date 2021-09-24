// Got this key by visiting the project in Firebase, then presssing the Settings Gear
const firebaseProjectKey = "AIzaSyAlOkrrmLSXFZCuPJs6HdxQFtF4D0dLX3E";
const signupLink = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseProjectKey}`;
const loginLink = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseProjectKey}`;
const changePasswordLink = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseProjectKey}`;

//% Async function that creates a new account OR signs us into our Firebase site
export const signup_login = async function (
  emailInput,
  passwordInput,
  requestType
) {
  // Decide what URL to use based on argument 3
  let link;
  if (requestType === "signup") link = signupLink;
  else if (requestType === "login") link = loginLink;
  else alert("bad parameter provided. choose 'signup' or 'login' for arg 3");

  // "Request Body Payload" described in Firebase docs
  const createAccountData = {
    email: emailInput, // set equal to arg 1
    password: passwordInput, // set equal to arg 2
    returnSecureToken: true,
  };

  // Make the POST request and parse the return data regardless of whether the operation succeeds or not
  try {
    const result = await fetch(link, {
      method: "POST",
      body: JSON.stringify(createAccountData),
      headers: { "Content-Type": "application/json" },
    });
    // If operation fails, explain why using the parsed object that gets returned
    if (!result.ok) {
      const parsedResult = await result.json();
      console.log(`Failed ${requestType} attempt. Here's why:`, parsedResult);
      throw new Error(parsedResult.error.message); // enter the obj we just logged
      
    }
    // If operation succeeds, return the response pay,oad to the component you use this function in
    if (result.ok) {
      return await result.json();
    }
  } catch (errorObj) {
    // render an error modal or something
  }
};
// The only difference between a function that creates a new account and one that logs us in is the URL arg

//% Async function that changes the account password
export const changePassword = async function (idToken, password) {
  const link = changePasswordLink;
  const requestBodyPayload = {
    // use values given to this helper function via parameters
    idToken,
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
      console.log(
        "Password change complete!"
      );
      return await result.json();
    }
  } catch (errorObj) {
    // render an error modal (on a real project)
  }
};
