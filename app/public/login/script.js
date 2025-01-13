document.getElementById('submitLogin').addEventListener('click', () => {
    //get input value
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;

    if(username === '' || password === ''){
        alert("Un des deux champs est nul. Réessayer");
    }
})