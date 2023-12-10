import { getElement } from "./getElement.js";
import { fetchData } from "./fetchData.js";

const pathName = window.location.pathname;
const URLParam = new URLSearchParams(window.location.search);

getElement(".search-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const value = getElement(".search-input").value;
    if (value) {
      window.location.href = `photos.html?search=${value}`;
    }
  }
});

getElement(".search-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const value = getElement(".search-input").value;
  if (value) {
    window.location.href = `photos.html?search=${value}`;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (pathName === "/index.html" || pathName === "/") {
    getElement(".buffer-container").style.display = "none";
    document.documentElement.style.overflow = "auto";
    getElement(".title").textContent = "Free Stock Photos";
    fetchData(`https://gallery-search-app.onrender.com/photos?page=1`);
  } else {
    getElement(".title").textContent = "";
    const value = URLParam.get("search");
    document.documentElement.style.overflow = "auto";
    if (value) {
      getElement(".search-input").value = value;
      getElement(".title").textContent = URLParam.get("search");
      document.title = `Gallery Search - ${value} photos`;
      fetchData(
        `https://gallery-search-app.onrender.com/photos/search?page=1&value=${value}`
      );
    } else {
      getElement(".image-loading").classList.add("hide");
      getElement(".error-message").classList.remove("hide");
      getElement(".error-message").textContent = "Try Searching a query";
    }
  }
});
