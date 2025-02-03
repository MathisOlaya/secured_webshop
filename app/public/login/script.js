document.getElementById("submitLogin").addEventListener("click", async () => {
  //get input value
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;

  if (username.trim() === "" || password.trim() === "") {
    return alert("Un des deux champs est nul. Réessayer");
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  try {
    const response = await fetch("/user/login", options);

    //get result
    if (response.status === 200) {
      const data = await response.json();

      if (data.ok) {
        //show home page
        window.location.href = `/user/${username}`;
      }
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch {
    alert("Erreur lors de la connection au serveur");
  }
});
