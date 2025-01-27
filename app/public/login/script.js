document.getElementById("submitLogin").addEventListener("click", async () => {
  //get input value
  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;

  if (username === "" || password === "") {
    alert("Un des deux champs est nul. Réessayer");
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
    const data = await response.json();

    if (data.ok) {
      //redirect to user page
      window.location.href = `/user/${username}`;
    } else {
      console.error(data.message);
    }
  } catch {}
});
