const urlLogin = "http://localhost:5678/api/users/login";



function login(email, password) {
    console.log(email)
    console.log(password)
    fetch(urlLogin, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (response.ok) {
            // window.location.href = '../index.html';
            console.log(response)
        } else {
            console.error("Erreur dans l’identifiant ou le mot de passe");
        }
    })
    .then((data) => {console.log(data)})
    .catch(error => console.log(error))
};
document.getElementById('bouton').addEventListener('click', function (e) {
    e.preventDefault();

const email = document.querySelector(".email").value;
const password = document.querySelector(".motdepasse").value;

login(email, password);
});