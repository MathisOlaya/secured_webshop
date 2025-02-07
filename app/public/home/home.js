const usernameSpan = document.getElementById("usernameTitle");

const username = getUsernameFromURL();

//Add href to profile page
document.getElementById(
    "linkToProfile"
).href = `${window.location.href}/profile`;

//Get username from URL
import { getUsernameFromURL } from "../helpers.js";

usernameSpan.innerText = getUsernameFromURL();
