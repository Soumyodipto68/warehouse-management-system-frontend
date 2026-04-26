export const decodeToken = (token) => {
  try {
    const base64Payload = token.split(".")[1];
    if (!base64Payload) return null;

    return JSON.parse(atob(base64Payload));
  } catch {
    return null;
  }
};