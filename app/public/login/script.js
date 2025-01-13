document.getElementById('submitLogin').addEventListener('click', () => {
    //get input value
    const username = document.getElementById('usernameInput');
    const password = document.getElementById('passwordInput');

    if(!(username) || !(password)){
        alert("Un des deux champs est nul. Réessayer");
    }
})