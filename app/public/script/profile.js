async function getUserData() {
    const res = await fetch(`${getHomePagePath}/getUserData`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
        }),
    });
}
