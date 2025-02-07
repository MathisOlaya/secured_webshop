import { getUsernameFromURL } from "../helpers.js";

//set route for home page
document.getElementById("redirectToHome").href = getHomePagePath();

//get username from url
const username = getUsernameFromURL();

function getHomePagePath() {
    const fullPath = window.location.href;

    const path = fullPath.split("/");

    path.pop();

    return path.join("/");
}

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
