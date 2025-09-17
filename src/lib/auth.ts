export const isLoggedIn = () =>
  typeof window !== "undefined" && localStorage.getItem("session") === "true";

export const login = () => {
  if (typeof window !== "undefined") localStorage.setItem("session", "true");
};

export const logout = () => {
  if (typeof window !== "undefined") localStorage.removeItem("session");
  window.location.reload();
};
