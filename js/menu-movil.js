const burguer = document.querySelector(".open-menu");
const menuMovil = document.querySelector("nav");
const clouse = document.querySelector(".cruz");

function botonHamburguesa() {
  burguer.addEventListener("click", () => {
    menuMovil.classList.toggle("nav-movil");
  });
  clouse.addEventListener("click", () => {
    menuMovil.classList.remove("nav-movil");
  });
}

botonHamburguesa();

categoriaProductos.forEach((boton) =>
  boton.addEventListener("click", () => {
    menuMovil.classList.remove("nav-movil");
  })
);
