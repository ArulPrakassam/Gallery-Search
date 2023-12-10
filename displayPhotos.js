import { fetchAgain } from "./fetchData.js";
import { getElement } from "./getElement.js";

export const displayPhotos = (data) => {
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

  getElement(".items-container").insertAdjacentHTML("beforeend", photoGallery);
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
    img.removeAttribute("data-src");
    img.removeAttribute("data-alt");

    if (img.complete) {
      img.parentElement.parentElement.style.minHeight = "auto";
    } else {
      img.addEventListener("load", () => {
        img.parentElement.parentElement.style.minHeight = "auto";
      });
    }
  };

  const imgObserver = new IntersectionObserver(
    (entries, imgObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          imgObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
      // rootMargin: "0px 0px 300px 0px",
    }
  );

  document.querySelectorAll("[data-src]").forEach((image) => {
    imgObserver.observe(image);
  });

  fetchAgain();
};
