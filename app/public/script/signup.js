document.getElementById("submitSignup").addEventListener("click", async () => {
  //get input value
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;

  if (username === "" || password === "") {
    return alert("Un des deux champs est nul. Réessayer");
  }

  //post option
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

  //call post method with options
  try {
    const response = await fetch("/user/signup", options);

    //get result
    const data = await response.json();

    if (response.ok) {
      if (data.ok) {
        window.location.href = `/user/${username}`;
      }
    } else {
      alert(data.message);
    }
  } catch {
    alert("Impossible d'accéder à la route spécifiée.");
  }
});
