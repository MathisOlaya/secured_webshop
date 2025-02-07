const usernameSpan = document.getElementById("usernameTitle");

//TODO : Afficher le nom de l'utilisateur dans le titre.
//Get username from token
function getUsernameFromURL() {
    // Récupérer l'URL actuelle
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split("/"); // Découpe l'URL en segments

    return pathSegments[2]; // Ici, '123'
}

usernameSpan.innerText = getUsernameFromURL();
