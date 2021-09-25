//% Async function that creates a new account OR signs us into our Firebase site
const signup_login = async function (
  emailInput,
  passwordInput,
  requestType
) {
  // Decide what URL to use based on argument 3
  let link;
  const firebaseProjectKey = "AIzaSyAlOkrrmLSXFZCuPJs6HdxQFtF4D0dLX3E";
  const signupLink = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseProjectKey}`;
  const loginLink = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseProjectKey}`;
  if (requestType === "signup") link = signupLink;
  else if (requestType === "login") link = loginLink;
  else alert("bad parameter provided. choose 'signup' or 'login' for arg 3");

  const requestBodyPayload = {
    email: emailInput, // set equal to arg 1
    password: passwordInput, // set equal to arg 2
    returnSecureToken: true,
  };

  // Make the POST request and parse the return data regardless of whether the operation succeeds or not
  try {
    const result = await fetch(link, {
      method: "POST",
      body: JSON.stringify(requestBodyPayload),
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
export default signup_login

