let favorites = readFromLocalStorage("favorites") || [];

// if (!favorites) favorites = [];

fetch("/data/destinations.json")
  .then((response) => response.json())
  .then((data) => {
    const sectionElm = document.createElement("section");

    sectionElm.classList.add("placesList");

    sectionElm.innerHTML = data.destinations
      .map((destination) => {
        return `
      <article class="place">      
        <img class="place__img" src="/img/${destination.image}">
        <div class="place__body">
          <button class="card__favoritebtn ${
            favorites.includes(destination.id.toString())
              ? "card__favoritebtn--selected"
              : ""
          }" data-favid="${destination.id}">
          <img class="place__body--img" src="/img/heart.svg">
          </button>
          <a href="destination.html?id=${destination.id}">
            <p>MORE</p>
          </a>
        </div>
      </article>
      `;
      })
      .join("");

    sectionElm
      .querySelectorAll(".card__favoritebtn")
      .forEach(function (button) {

        button.addEventListener("click", (evnt) => {
          // let currentId = evnt.target.dataset.favid;
          let cardFavoriteBtn = evnt.target.closest(".card__favoritebtn");
          let dataAttNumber =cardFavoriteBtn.dataset.favid;
          
          if (favorites.includes(dataAttNumber)) {
            let newFavorites = favorites.filter((id) => id != dataAttNumber);
            favorites = newFavorites;
            cardFavoriteBtn.classList.remove("card__favoritebtn--selected");
            // evnt.target.classList.remove("card__favoritebtn--selected");
          } else {
            
            favorites.push(dataAttNumber);
            cardFavoriteBtn.classList.add("card__favoritebtn--selected");
            // evnt.target.classList.add("card__favoritebtn--selected");
          }
          saveToLocalStorage("favorites", favorites);
        });
      });
    document.querySelector("#root").append(sectionElm);
  });
