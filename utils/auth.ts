import axios from "axios";

const API_KEY = "AIzaSyDvw3aQ4L2z1vTf0J5KD1_LOImLtgycoF0";

export async function createUser(email: string, password: string) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    { email, password, returnSecureToken: true }
  );
}
