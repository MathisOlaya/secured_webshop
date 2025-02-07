function getUsernameFromURL() {
    // Récupérer l'URL actuelle
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split("/"); // Découpe l'URL en segments

    return pathSegments[2];
}

export { getUsernameFromURL };
