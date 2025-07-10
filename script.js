const menuList = document.getElementById("menu-list");
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelectorAll("header nav a");

// Toggle mobile menu
menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("active");
  menuIcon.classList.toggle("active");
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        menuList.classList.remove("active");
        menuIcon.classList.remove("active");
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
});

// Set home link active by default
document.querySelector("header nav a[href='#home']").classList.add("active");


// Intersection Observer for active nav link highlighting
const sections = document.querySelectorAll("section");

const observerOptions = {
  root: null, // viewport
  rootMargin: "0px",
  threshold: 0.1 // 10% of the section must be visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
      entry.target.classList.add("in-view");
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});

// Hide loader when page is fully loaded
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-wrapper");
  loader.classList.add("hidden");
});
