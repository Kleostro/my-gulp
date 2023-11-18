const burger = document.querySelector(".burger");
if(burger) {

  const menu = document.querySelector(".header__nav");
  const menuLinks = menu.querySelectorAll(".nav__list-link");

  burger.addEventListener("click", () => {
    burger.classList.toggle("burger--active");
    menu.classList.toggle("nav--active");
  });

  menuLinks.forEach(function (el) {
    el.addEventListener("click", function () {
      burger.classList.toggle("burger--active");
      menu.classList.toggle("nav--active");
    });
  });
}

