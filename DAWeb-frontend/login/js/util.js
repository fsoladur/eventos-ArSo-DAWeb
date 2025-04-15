function login({ url, isCallingGithub }) {
  if (isCallingGithub) {
    window.location.href = url;
    return;
  }

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password: password }),
  })
    .then(function (response) {
      if (!response.ok) {
        return response.text().then(function (errorMessage) {
          throw new Error(errorMessage);
        });
      }
      return response.json();
    })
    .then(function (data) {
      // Guardar datos en localStorage
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "http://localhost:5713/";
    })
    .catch(function (error) {
      console.error("Error en login:", error);
      alert("Error: " + error.message);
    });
}
