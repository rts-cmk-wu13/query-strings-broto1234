const search = window.location.search;
const params = new URLSearchParams(search);
let id = params.get("id");

fetch(`/data/${id}.json`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        const sectionElm = document.createElement("section");

        sectionElm.classList.add("destination");

        sectionElm.innerHTML = `
        <section class="card">
            <div class="card__left">
                <span class="card__span">
                    <img class="card__fav" src="/img/heart.svg">Favotir
                </span>
                <img class="card__img" src="/img/${data.image}" >
            </div>
            <div class="card__right">
                <p class="card__dest">${data.destination}</p>
                <p class="card__title">${data.title}</p>
                <p class="card__subtitile">${data.subtitle}</p>
                <p>${data.text}</p>
                <ul><span class="card--style">Facilities:</span> ${data.facilities.map(facility =>
                    `<li>${facility}</li>`
                ).join("")}</ul>
            <a class="backHomeBtn" href="index.html">Back to home</a>
            </div>
        </section>
        `;
        document.querySelector("#root").append(sectionElm);
    })
