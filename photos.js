import {
  scrolling,
  eventListeners,
  fetchData,
  searchInput,
  title,
  URLParam,
  loading,
  errorMessage,
} from "./module.js";

var page = 1;

window.addEventListener("load", () => {
  title.textContent = "";
  const value = URLParam.get("search");
  document.documentElement.style.overflow = "auto";
  searchInput.value = value;
  if (value) {
    document.title = `Gallery Search - ${value} photos`;
    fetchData(
      `https://gallery-search-app.onrender.com/photos/search?page=${page}&value=${value}`
    );
  } else {
    loading.classList.add("hide");
    errorMessage.classList.remove("hide");
    errorMessage.textContent = "Try Searching a query";
    searchInput.value = "";
  }
});

window.addEventListener("scroll", scrolling);
eventListeners();
