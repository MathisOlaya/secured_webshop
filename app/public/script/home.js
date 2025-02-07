document.getElementById("logoutHome").addEventListener("click", async () => {
  const res = await fetch(`/user/${username}/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  console.log(data);
  if (data.success) {
    window.location.href = "/login";
  }
});
