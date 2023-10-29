import {
  scrolling,
  eventListeners,
  bufferContainer,
  fetchData,
  searchInput,
  title,
} from "./module.js";
var page = 1;

window.addEventListener("load", () => {
  bufferContainer.style.display = "none";
  document.documentElement.style.overflow = "auto";
  title.textContent = "Free Stock Photos";
  fetchData(`https://gallery-search-app.onrender.com/photos?page=${page}`);
});

window.addEventListener("scroll", scrolling);

eventListeners();
