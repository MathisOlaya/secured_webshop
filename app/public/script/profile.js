async function getUserData() {
    const res = await fetch(`/user/${username}/getUserData`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
        }),
    });
    const object = await res.json();

    updateFields(object.data);
}

getUserData();

function updateFields(user) {
    document.getElementById("id").innerText = user.user_id;
    document.getElementById("username").innerText = user.username;
    document.getElementById("role").innerText = user.role;
    document.getElementById("createdAt").innerText = user.created_at;
}
