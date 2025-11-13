//import { productos } from "./productos.js";
import { agregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

// espero que el html se cargue antes de ejecutar el codigo
document.addEventListener("DOMContentLoaded", () => {
  // accedo al contenedor de las tarjetas
  const contenedor = document.getElementById("contenedor-tarjetas");

  // obtengo el carrito para actualizar el contador
  const carrito = obtenerCarrito();
  actualizarContador(carrito);

  // fetch para cargar el json de productos
  fetch("./data/productos.json")
    .then((res) => {
      if (!res.ok) {
        // tiro un error si la respuesta http no es ok
        throw new Error(`error http status: ${res.status}`);
      }
      // devuelvo la respuesta como json
      return res.json();
    })
    // proceso los datos
    .then((data) => {
      data.forEach((producto) => {
        // creo los elementos (article, img, h3, p, button)
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `US $ ${producto.precio}`;

        const boton = document.createElement("button");
        boton.classList.add("btn");
        boton.textContent = "agregar al carrito";

        boton.addEventListener("click", () => {
          agregarAlCarrito(producto);
        });

        // armo la estructura de la tarjeta
        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(boton);

        contenedor.appendChild(tarjeta);
      });
    })
    .catch(error => {
      // manejo de error si el fetch falla
      console.error("hubo un problema con la operacion fetch:", error);
      // muestro un mensaje de error en el contenedor
      const mensajeError = document.createElement("p");
      mensajeError.textContent = "error al cargar los productos. intente mas tarde.";
      contenedor.appendChild(mensajeError);
    });
});