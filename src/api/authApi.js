const VALID_EMAIL = "230408003@st.biruni.edu.tr";
const VALID_PASSWORD = "123456istanbul";

export async function login(username, password) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (
    username === VALID_EMAIL &&
    password === VALID_PASSWORD
  ) {
    return {
      username,
      isAuthenticated: true,
    };
  }

  throw new Error("Invalid credentials");
}