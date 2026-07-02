import api from "./axios";

export const getMyProfile = () => {
  const userId = localStorage.getItem("userId");
  return api.get(`/api/users/${userId}`);
};
