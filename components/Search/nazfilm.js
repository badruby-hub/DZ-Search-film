"use strict";
const nameMovie = [
  "red",
  "green",
  "black",
  "tea",
  "room",
  "real",
  "good",
  "ride",
  "group",
  "grin",
  "gap",
  "dad",
][Math.floor(Math.random() * 12)];

const body = document.querySelector("body"),
  moviePoster = document.querySelector(".item"),
  results = document.querySelector(".container-postr"),
  block1 = document.querySelector("div.block-D-none"),
  blockClose = document.querySelector("div.window"),
  templatePostr = document.querySelector(".movie-content").content,
  search = document.getElementById("search"),
  btnSearch = document.querySelector(".btn-search"),
  btnlogo = document.querySelector(".group-logo");

let currentPage = 1;
let page = 1;

//кнопки добавления контента
const btnAddPost = document.querySelector("#add"),
  btnAddPost2 = document.querySelector("#add2");

const btnBackTop = document.querySelector(".back-to-top"),
  btnPosts1 = document.querySelector("div.add"),
  btnPosts2 = document.querySelector("div.add2");

getVisualmoviePostr();

async function getSearchInformation(page = 1) {
  try {
    btnPosts1.classList.add("D-none");
    btnPosts2.classList.add("D-none");
    document.querySelector(".img-load").classList.remove("D-none");
    const response = await fetch(`https://www.omdbapi.com/?apikey=a2b07930&s=${search.value}&page=${page}`);
    const data = await response.json();
    const results = data.Search;
    results.forEach((item) => {
      createMovie(item);
    });
    if (data.totalResults > currentPage * 10) {
      btnPosts1.classList.remove("D-none");
      btnPosts2.classList.add("D-none");
    } else {
      btnPosts1.classList.add("D-none");
    }
    btnPosts2.classList.add("D-none");
    document.querySelector(".img-load").classList.add("D-none");
  } catch (error) {
    showErrSearch(error);
    btnPosts1.classList.add("D-none");
    btnPosts2.classList.add("D-none");
    document.querySelector(".img-load").classList.add("D-none");
  }
}

async function getVisualmoviePostr() {
  try {
    btnPosts1.classList.add("D-none");
    btnPosts2.classList.add("D-none");
    document.querySelector(".img-load").classList.remove("D-none");
    const response = await fetch(`https://www.omdbapi.com/?apikey=a2b07930&s=${nameMovie}&page=${page}`);
    const data = await response.json();
    if (data.Search) {
      data.Search.forEach((item) => {
        createMovie(item);
      });
      page++;
      btnPosts1.classList.add("D-none");
      btnPosts2.classList.remove("D-none");
    }

    btnPosts1.classList.add("D-none");
    btnPosts2.classList.remove("D-none");
    document.querySelector(".img-load").classList.add("D-none");
  } catch (err) {
    showErr(err);
    btnPosts1.classList.add("D-none");
    btnPosts2.classList.add("D-none");
    document.querySelector(".img-load").classList.add("D-none");
  }
}

function showErr(err) {
  results.innerHTML = `<span class="error" ><img width="150px"  src="face-error.png"> </br> что-то пошло не так, перезагрузите страницу</span>`;
}

function showErrSearch() {
  results.innerHTML = `<span class="error"><strong style="text-decoration: underline;">Информация:</strong> </br>
 Пустое поле или фильм был не найден, в связи с чем поиск приостановлен.</span>`;
}

function clearInfo() {
  results.textContent = "";
}
//buttons

btnlogo.addEventListener("click", () => {
  btnPosts1.classList.add("D-none");
  btnPosts2.classList.add("D-none");
  clearInfo();
  search.value = "";
});

btnAddPost.addEventListener("click", () => {
  currentPage++;
  page++;
  getSearchInformation(page);
});

btnAddPost2.addEventListener("click", () => {
  getVisualmoviePostr(page);
});

btnSearch.addEventListener("click", () => {
  clearInfo();
  getSearchInformation();
});

search.addEventListener("keydown", (event) => {
  if (event.code == "Enter") {
    clearInfo();
    getSearchInformation();
  }
});

//ModalWindo
async function createMovie(item) {
  const fragment = templatePostr.cloneNode(true);
  const movieItem = fragment.querySelector("div.item");
  const moviePoster = movieItem.querySelector(".poster-img");
  const movieTitle = movieItem.querySelector("h3.name-movie");
  const movieDate = movieItem.querySelector("div.date-movie");
  const urlMovieModal = movieItem.querySelector("a.url-movie");
  const movieRating = movieItem.querySelector("div.rat-imdb");
  const modalInfo = movieItem.querySelector(".text-plot");
  const modalPoster = movieItem.querySelector(".img-modal");
  const modalName = movieItem.querySelector(".info-name-poster");
  const modalGenre = movieItem.querySelector(".info-genre");
  const modalCounry = movieItem.querySelector(".info-country");
  const modalAcotrs = movieItem.querySelector(".info-actors");
  if (item.Poster !== "N/A") {
    moviePoster.src = item.Poster;
  } else {
    moviePoster.src = `poster-404-img.jpg`;
  }

  movieTitle.textContent = item.Title;
  movieDate.textContent = `Дата: ${item.Year}`;
  urlMovieModal.href = "https://www.imdb.com/title/" + item.imdbID;

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=a2b07930&i=${item.imdbID}`);
    const data = await response.json();
    movieRating.textContent = `IMDB: ${data.imdbRating}`;

    const genres = data.Genre.split(",");
    genres.forEach((genre) => {
      const GenreItem = document.createElement("li");
      GenreItem.textContent = genre;
      modalGenre.append(GenreItem);
    });

    if (data.Plot !== "N/A") {
      modalInfo.textContent = `Plot: ${data.Plot}`;
    } else {
      modalInfo.textContent = `Приносим наши извинения, описания к фильму нет`;
    }
    const actors = data.Actors.split(",");
    actors.forEach((actor) => {
      const actorItem = document.createElement("li");
      actorItem.textContent = `Актеры`;
      actorItem.textContent = actor;
      modalAcotrs.append(actorItem);
    });
    modalPoster.src = data.Poster;
    modalName.textContent = data.Title;

    const countries = data.Country.split(",");
    countries.forEach((country) => {
      const countryItem = document.createElement("li");
      countryItem.textContent = country;
      modalCounry.append(countryItem);
    });
  } catch (error) {
    console.log(error);
  }
  results.append(fragment);
}

results.addEventListener("click", (event) => {
  const item = event.target.closest(".item");
  if (item) {
    const modal = item.querySelector(".window");
   if (modal){
  modal.querySelector(".img-modal").src = item.querySelector(".img-modal").src;
  modal.querySelector(".info-name-poster").textContent =
    item.querySelector(".info-name-poster").textContent;
  modal.querySelector(".text-plot").textContent =
    item.querySelector(".text-plot").textContent;
  modal.classList.add("block");
  modal.classList.remove("block-D-none");
   }
  }
});

results.addEventListener("click", (event) => {
  const btnHeart = event.target.closest(".btn-heart");
  if (btnHeart) {
    const imgHeart = btnHeart.querySelector(".heart");
    imgHeart.src = imgHeart.src.includes("Red-heart.png")
      ? "Black-heart.png"
      : "Red-heart.png";
  }
});

results.addEventListener("click", (event) => {
  const parent = event.target.closest(".window");
  const btnClose = event.target.closest(".close-btn");
  if (!btnClose) return;

  parent.classList.remove("block");
  parent.classList.add("block-D-none");
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    btnBackTop.classList.remove("D-none");
  } else {
    btnBackTop.classList.add("D-none");
  }
});

btnBackTop.addEventListener("click", () => {
  window.scrollTo(window.scrollX, 0);
});
