export const login = async dto => {
  const response = await fetch('http://localhost:8090/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      username: dto.username,
      password: dto.password
    }),
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Usuario o contraseña incorrectos');
  }
  const data = await response.json();

  return data;
};

export const logout = async () => {
  const response = await fetch('http://localhost:8090/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  }

  return response.body;
};
