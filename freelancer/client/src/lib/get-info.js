

export const getUsername = () => {
  const storedToken = localStorage.getItem('token');
  const token = JSON.parse(storedToken);
  return token.username;
};