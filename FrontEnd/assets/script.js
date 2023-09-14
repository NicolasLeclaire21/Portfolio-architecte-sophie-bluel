const url = "http://localhost:5678/api/works"
const container = document.querySelector(".gallery");


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





