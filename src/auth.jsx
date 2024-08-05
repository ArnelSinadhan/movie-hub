import { jwtDecode } from "jwt-decode";

export function isAdmin(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.isAdmin === true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
}
