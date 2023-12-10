import { getElement } from "./getElement.js";
import { displayPhotos } from "./displayPhotos.js";

const pathName = window.location.pathname;
const URLParam = new URLSearchParams(window.location.search);
let page = 1;

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const { data, message } = await response.json();
    getElement(".error-message").textContent = "";
    getElement(".error-message").classList.add("hide");
    getElement(".image-loading").classList.add("hide");
    getElement(".loading-header").classList.add("hide");
    if (message) {
      getElement(".title").textContent = "";
      getElement(".error-message").classList.remove("hide");
      getElement(".error-message").textContent = message;
      return;
    }

    displayPhotos(data);
  } catch (error) {
    getElement(".image-loading").classList.add("hide");
    getElement(".loading-header").classList.add("hide");
    getElement(".error-message").classList.remove("hide");
    getElement(".error-message").textContent = "Please try again later";
    console.log(error);
  }
};

export const fetchAgain = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        getElement(".loading-header").classList.remove("hide");
        page = page + 1;

        if (pathName === "/index.html" || pathName === "/") {
          fetchData(
            `https://gallery-search-app.onrender.com/photos?page=${page}`
          );
        } else {
          const value = URLParam.get("search");
          fetchData(
            `https://gallery-search-app.onrender.com/photos/search?page=${page}&value=${value}`
          );
        }
      }
    },
    {
      root: null,
      threshold: 0.5,
    }
  );
  observer.observe(document.querySelector("footer"));
};
