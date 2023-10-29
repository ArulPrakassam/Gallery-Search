const itemsContainer = document.querySelector(".items-container");
const bufferContainer = document.querySelector(".buffer-container");
const loadingHeader = document.querySelector(".loading-header");
const loading = document.querySelector(".image-loading");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const errorMessage = document.querySelector(".error-message");
const title = document.querySelector(".title");
const URLParam = new URLSearchParams(window.location.search);

var page = 1;

const scrolling = () => {
  //when using in scroll event gives the total height of the document
  let offsetHeight = document.documentElement.offsetHeight;
  let clientHeight = document.documentElement.clientHeight;
  //their difference gives the scroll height
  let difference = offsetHeight - clientHeight;

  //user scrolling and the scroll bar is at the center then condition satisfied
  if (window.scrollY > difference - 800) {
    loadingHeader.classList.remove("hide");
    page = page + 1;

    fetchData(`https://gallery-search-app.onrender.com/photos?page=${page}`);
  }
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const { data, message } = await response.json();
    errorMessage.textContent = "";
    errorMessage.classList.add("hide");
    loading.classList.add("hide");
    loadingHeader.classList.add("hide");
    if (message) {
      title.textContent = "";
      errorMessage.classList.remove("hide");
      errorMessage.textContent = message;
      return;
    }
    if (URLParam.get("search")) {
      title.textContent = URLParam.get("search");
    }

    displayPhotos(data);
  } catch (error) {
    loading.classList.add("hide");
    loadingHeader.classList.add("hide");
    errorMessage.classList.remove("hide");
    errorMessage.textContent = "Please try again later";
    console.log(error);
  }
};

const displayPhotos = (data) => {
  const photoGallery = data
    .map((photo) => {
      const { alt, url, src, avg_color } = photo;

      return `<div class="single-item"  style="background-color:${avg_color}">
      
          <a href="${url}">
          <img src="" class="photo-item"  data-src="${src}" data-alt="${alt}" />
          </a>            
              </div>`;
    })
    .join(" ");

  itemsContainer.insertAdjacentHTML("beforeend", photoGallery);
  lazyLoading();
};

const lazyLoading = () => {
  const loadImage = (img) => {
    const src = img.getAttribute("data-src");
    const alt = img.getAttribute("data-alt");
    if (!src) {
      return;
    }
    img.src = src;
    img.alt = alt;

    if (img.complete) {
      img.parentElement.parentElement.style.minHeight = "auto";
    } else {
      img.addEventListener("load", () => {
        img.parentElement.parentElement.style.minHeight = "auto";
      });
    }
  };

  const imgOptions = {
    threshold: 0,
    // rootMargin: "0px 0px 300px 0px",
  };
  const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        loadImage(entry.target);
        imgObserver.unobserve(entry.target);
      }
    });
  }, imgOptions);

  document.querySelectorAll(".photo-item").forEach((image) => {
    imgObserver.observe(image);
  });
};

const eventListeners = () => {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const value = searchInput.value;
      if (value) {
        window.location.href = `photos.html?search=${value}`;
      }
    }
  });

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = searchInput.value;
    if (value) {
      window.location.href = `photos.html?search=${value}`;
    }
  });
};

export {
  scrolling,
  eventListeners,
  itemsContainer,
  bufferContainer,
  loadingHeader,
  loading,
  searchBtn,
  searchInput,
  errorMessage,
  title,
  URLParam,
  displayPhotos,
  lazyLoading,
  fetchData,
};
