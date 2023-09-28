const url = "http://localhost:5678/api/works"
const container = document.querySelector(".gallery");
const token = localStorage.getItem("token");

const boutonTous = document.createElement("button");
boutonTous.innerText = "Tous";
const boutonObjets = document.createElement("button");
boutonObjets.innerText = "Objets";
const boutonAppartements = document.createElement("button");
boutonAppartements.innerText = "Appartements";
const boutonHotelsRestaurants = document.createElement("button");
boutonHotelsRestaurants.innerText = "Hôltels & Restaurants";

const divFiltres = document.querySelector(".filtres");

divFiltres.appendChild(boutonTous);
divFiltres.appendChild(boutonObjets);
divFiltres.appendChild(boutonAppartements);
divFiltres.appendChild(boutonHotelsRestaurants);




let allProjets = [];


const getProjets = () => {
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        allProjets = data;
        gallery(allProjets);
    });

        
        boutonObjets.addEventListener("click", function () {
            const filtreObjets = allProjets.filter(function (a) {
                return a.category.id == 1;
            });
            container.innerHTML = "";
            gallery(filtreObjets);
        });
        boutonAppartements.addEventListener("click", function () {
            const filtreAppartements = allProjets.filter(function (a) {
                return a.category.id == 2;
            });
            container.innerHTML = "";
            gallery(filtreAppartements);
        });
        boutonHotelsRestaurants.addEventListener("click", function () {
            const filtreHotelsRestaurants = allProjets.filter(function (a) {
                return a.category.id == 3;
            });
            container.innerHTML = "";
            gallery(filtreHotelsRestaurants);
        });
        boutonTous.addEventListener("click", function () {
            gallery(allProjets);
        });
    };


const gallery = (filteredData) => {
    container.innerHTML = "";
        for(const projet of filteredData) {
            const element = document.createElement("figure");
            element.classList.add(`js-projet-${projet.id}`);
            const image = document.createElement("img");
            const caption = document.createElement("figcaption");
            image.src = projet.imageUrl;
            image.alt = projet.title;
            caption.innerText = projet.title;
            element.appendChild(image);
            element.appendChild(caption);  
            container.appendChild(element);
        }
};
getProjets();

// Ouverture de la modale
let modale = null

const openModale = function (e) {
    e.preventDefault()
    modale = document.querySelector(e.target.getAttribute("href"))
    modale.style.display = null
    modale.removeAttribute("aria-hidden")

    modaleProjets();

    document.querySelectorAll(".js-btn-ajouter").forEach (b => {
        b.addEventListener("click", openModale2)
    })
    
    // Appel fermeture modale
    modale.addEventListener("click", closeModale)
    modale.querySelector(".js-modale-close").addEventListener("click", closeModale)
    modale.querySelector(".js-modale-stop").addEventListener("click", stopPropagation)
}

// Element qui ouvre la modale
document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", openModale)
})


// Fermeture de la modale
const closeModale = function(e) {
    e.preventDefault()
    if (modale === null) return


    modale.style.display = "none"
    modale.setAttribute("aria-hidden", "true")

    modale.removeEventListener("click", closeModale)
    modale.querySelector(".js-modale-close").removeEventListener("click", closeModale)
    modale.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation)
    modale = null
}

// Définit la "border" du click pour fermer la modale
const stopPropagation = function(e) {
    e.stopPropagation()
};

// Ferme la modale avec la touche echap
window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
        closeModaleProjet(e)}
});












function resetmodaleSectionProjets() {  
	modaleSectionProjets.innerHTML = "";
}

const modaleSectionProjets = document.querySelector(".js-modale-projets");

function modaleProjets() {
    fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    resetmodaleSectionProjets()
    for (let i = 0; i < data.length; i++) {
        
        const div = document.createElement("div");
        div.classList.add("gallery-projet-modale");
        modaleSectionProjets.appendChild(div);

        const img = document.createElement("img");
        img.src = data[i].imageUrl;
        img.alt = data[i].title;
        div.appendChild(img);

        const icon = document.createElement("i");
        icon.classList.add(data[i].id, "fa-solid", "fa-trash-can", "supprimer-projet"); 
        div.appendChild(icon);
    }
    listenerSupprimerProjet()
  })
  .catch(function(error) {
    console.log(error)
  });
}



function listenerSupprimerProjet() {
        document.querySelectorAll(".supprimer-projet").forEach(btnSupprimer => {
            btnSupprimer.addEventListener("click", supprimerProjet);

    });
}


function supprimerProjet(event) {
    event.preventDefault()
    console.log("token", token)
    fetch(`http://localhost:5678/api/works/${this.classList[0]}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}`},
    })
    .then (response => response.json())
    .then (data => {
        console.log("ezvferfer", data)
        console.log("suppresion du projet" + this.classList[0])
        refreshPage(this.classList[0])
    })
    .catch (error => {
        console.log(error)
    })
}

// Rafraichit les projets sans recharger la page
async function refreshPage(i){
    modaleProjets(); // Re lance une génération des projets dans la modale admin

    // supprime le projet de la page d'accueil
    const projetAccueil = document.querySelector(`.js-projet-${i}`);
    projetAccueil.style.display = "none";
}



//changements sur la page lorsqu'on est connecté


const boutonLogin = document.querySelector(".btn-login");

pageAdmin()

function pageAdmin() {
    document.querySelectorAll(".modif-login").forEach(a => {
        if (token === null) {
            return;
        }
        else {
            a.removeAttribute("aria-hidden")
            a.removeAttribute("style")
            boutonLogin.innerHTML = "logout";
            divFiltres.innerHTML = "";
        }
    });
}



// Ouverture de la modale 2
let modale2 = null

const openModale2 = function (e) {
    e.preventDefault()
    modale2 = document.querySelector(e.target.getAttribute("href"))

    modale2.style.display = null
    modale2.removeAttribute("aria-hidden")

    modaleProjets();

    // Appel fermeture modale
    modale.addEventListener("click", closeModale2)
    modale.querySelector(".js-modale-close").addEventListener("click", closeModale2)
    modale.querySelector(".js-modale-stop").addEventListener("click", stopPropagation)
}

// Element qui ouvre la modale
document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", openModale)
})

// Fermeture de la modale
const closeModale2 = function(e) {
    e.preventDefault()
    if (modale === null) return


    modale2.style.display = "none"
    modale2.setAttribute("aria-hidden", "true")

    modale2.removeEventListener("click", closeModale)
    modale2.querySelector(".js-modale-close").removeEventListener("click", closeModale)
    modale2.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation)
    modale2 = null
}