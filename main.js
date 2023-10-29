import {
  scrolling,
  eventListeners,
  bufferContainer,
  fetchData,
} from "./module.js";
var page = 1;

window.addEventListener("load", () => {
  bufferContainer.style.display = "none";
  document.documentElement.style.overflow = "auto";
  fetchData(`https://gallery-search-app.onrender.com/photos?page=${page}`);
});

window.addEventListener("scroll", scrolling);

eventListeners();
