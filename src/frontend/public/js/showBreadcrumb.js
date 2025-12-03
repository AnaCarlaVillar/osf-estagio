// showBreadCrumb.js

function showBreadcrumb() {
  const breadcrumb = document.querySelector("#breadcrumb");

  if (!breadcrumb) return;

  breadcrumb.classList.remove("is-hidden");

  const links = breadcrumb.querySelectorAll("ul li a");
  const currentPath = window.location.pathname;

  let currentIndex = -1;

  links.forEach((link, index) => {
    if (link.getAttribute("href") === currentPath) {
      currentIndex = index;
    }
  });

  if (currentIndex === -1) {
    currentIndex = links.length - 2;
  }

  links.forEach((link, index) => {

    if (index < currentIndex) {
      link.classList.add("has-text-white", "has-text-weight-bold");
      link.style.pointerEvents = "auto";
      return;
    }

    if (index === currentIndex) {
      link.classList.remove("has-text-white");
      link.classList.add("has-text-warning-light", "has-text-weight-bold");
      link.removeAttribute("href");
      link.style.cursor = "default";
      return;
    }

    if (index > currentIndex) {
      link.classList.remove("has-text-white");
      link.classList.add("has-text-black");
      link.removeAttribute("href");
      link.style.pointerEvents = "none";
      link.style.cursor = "not-allowed";
    }
  });
}

window.showBreadcrumb = showBreadcrumb;