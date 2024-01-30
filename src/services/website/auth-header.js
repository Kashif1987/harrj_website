export default function authHeader() {
  const userId = JSON.parse(localStorage.getItem("userId"));
  if (userId && userId.token) {
    return { "x-access-token": userId.token };
  }
  else {
    return {};
  }
}