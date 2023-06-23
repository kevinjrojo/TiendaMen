let productos = [];

fetch("./js/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    cargarProductos(productos);
  });

/*--------- Buscamos todos html que vamos a utilizar en js ---------*/

const contenedorProductos = document.querySelector(".main");
const temaNav = document.querySelector("nav");
let categoriaProductos = document.querySelectorAll(".boton-categoria");
let tema = document.querySelector("dd");
let lunaSol = document.querySelector(".tema");
let agregarProducto = document.querySelectorAll(".boton-agregar");
const numero = document.querySelector(".number");
const titulos = document.querySelector("#titulo-principal");
const nombre = document.querySelector(".logo");
let bolso = document.querySelector("i");
/*-------- Cargamos todas las tarjetas de los productos dentro de una funcion -----------*/

function cargarProductos(productosElejisdos) {
  contenedorProductos.innerHTML = "";

  productosElejisdos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("cosas");
    div.innerHTML = `<div id="tarjet">
                            <img src="${producto.imagen}" alt="${producto.categoria}" class="img">
                                <h3 class="text-nombre">${producto.categoria}</h3>
                                    <p class="precio">$${producto.precio}</p>
                                        <button class="boton-agregar" id="${producto.id}">AGREGAR</button>
                        </div> `;

    contenedorProductos.append(div);
  });
  carrrito();
}

/*-------- Creamos un evento para cada boton de las categorias ---------*/

function categoriasDeProductos() {
  categoriaProductos.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.currentTarget.id != "todos") {
        const productoscategoria = productos.find(
          (producto) => producto.categoria === e.currentTarget.id
        );
        titulos.innerText = productoscategoria.nombre;

        const productosSeleccionados = productos.filter(
          (producto) => producto.categoria === e.currentTarget.id
        );
        cargarProductos(productosSeleccionados);
      } else {
        titulos.innerHTML = "TODOS LOS PRODUCTOS";
        cargarProductos(productos);
      }
    });
  });
}

categoriasDeProductos();

/*------- Creamos un tema claro y otro oscuro para nuestra pagina-----*/

function cambiarTema() {
  tema.addEventListener("click", () => {
    let temaMain = document.querySelector(".main");
    let temaFooter = document.querySelector(".footer");
    let temaCategorias = document.querySelector(".categorias");
    let temaHeader = document.querySelector(".header");
    let btnPantalon = document.querySelector("#pantalon");
    let btnRemera = document.querySelector("#remera");
    let btnZapatilla = document.querySelector("#zapatilla");
    let btnCampera = document.querySelector("#campera");
    let btnTodos = document.querySelector("#todos");

    temaHeader.classList.toggle("tema-header");
    lunaSol.classList.toggle("tema-lunaSol");
    temaNav.classList.toggle("tema-nav");
    temaCategorias.classList.toggle("tema-categorias");
    temaMain.classList.toggle("tema-main");
    temaFooter.classList.toggle("tema-footer");
    nombre.classList.toggle("tema-name");
    btnPantalon.classList.toggle("btn-pantalon");
    btnRemera.classList.toggle("btn-remera");
    btnZapatilla.classList.toggle("btn-zapatilla");
    btnCampera.classList.toggle("btn-campera");
    btnTodos.classList.toggle("btn-todos");
    tema.classList.toggle("tema-tema");
    bolso.classList.toggle("tema-bolsoNumber");

    if (temaCategorias.classList.contains("tema-categorias")) {
      tema.innerHTML = "☀️";
    } else {
      tema.innerHTML = "🌙";
    }
  });
}

cambiarTema();

/*-------- Usamos eventos para cargar nuestros productos en el carrito----*/

function carrrito() {
  agregarProducto = document.querySelectorAll(".boton-agregar");
  let num = document.querySelector(".number");

  agregarProducto.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      Toastify({
        text: "Producto agregado",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          padding: "8px",
          background: "rgb(95, 6, 6)",
          border: "4px white solid",
          color: "white",
        },
        onClick: function () {}, // Callback after click
      }).showToast();

      const idBoton = e.currentTarget.id;
      const productoAgregados = productos.find(
        (producto) => producto.id === idBoton
      );

      if (productosCarrito.some((producto) => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(
          (producto) => producto.id === idBoton
        );
        productosCarrito[index].cantidad++;
      } else {
        productoAgregados.cantidad = 1;
        productosCarrito.push(productoAgregados);
      }

      actualizarNumero();

      localStorage.setItem(
        "productos-carrito",
        JSON.stringify(productosCarrito)
      );
    });
  });
}

function actualizarNumero() {
  let number = productosCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numero.innerText = number;
}

/*---- En este array vacio se van a cargar nuestros productos----*/

let productosCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-carrito");

if (productosEnCarritoLS) {
  productosCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumero();
} else {
  productosCarrito = [];
}
