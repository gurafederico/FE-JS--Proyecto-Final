import { obtenerCarrito } from "./storage.js";
import { 
    eliminarProducto, 
    vaciarCarrito, 
    // importo las nuevas funciones
    incrementarCantidad, 
    decrementarCantidad 
} from "./funcionesCarrito.js";
import { actualizarContador } from "./ui.js";

/* calcula la cantidad total y el precio total del carrito */
const calcularResumenCarrito = (carrito) => {
    // sumo la propiedad 'cantidad' de cada producto
    const cantidadTotal = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    // sumo (precio * cantidad) de cada producto
    const precioTotal = carrito.reduce((acc, producto) => {
        return acc + (producto.precio * producto.cantidad);
    }, 0);

    return {
        cantidadTotal,
        precioTotal: precioTotal.toFixed(2) // formateo a 2 decimales
    };
};

/* muestro el resumen del carrito (total y cantidad) en el dom */
const mostrarResumenCarrito = (carrito) => {
    const resumenContenedor = document.getElementById("resumen-carrito");
    resumenContenedor.innerHTML = ""; // limpio el contenedor

    if (carrito.length) {
        const resumen = calcularResumenCarrito(carrito);

        const resumenHTML = document.createElement("div");
        resumenHTML.classList.add("resumen-compra"); 

        resumenHTML.innerHTML = `
            <h3>Resumen de la Compra</h3>
            <p>Cantidad de Productos: <span>${resumen.cantidadTotal}</span></p>
            <p>Total a Pagar: <span>USD ${resumen.precioTotal}</span></p>
            <button class="btn btn-finalizar">Finalizar Compra</button>
        `;

        resumenContenedor.appendChild(resumenHTML);

        

        const btnVaciar = document.createElement("button");
        btnVaciar.classList.add("btn");
        btnVaciar.classList.add("btn-vaciar-carrito");
        btnVaciar.textContent = "Vaciar carrito";
        btnVaciar.addEventListener("click", () => {
            vaciarCarrito();
            // volver a renderizar para actualizar la vista
            renderizarCarrito();
        });

        
        resumenContenedor.appendChild(btnVaciar); 
        
        // ======================================================================
    }
};


const renderizarCarrito = () => {
    // obtengo el carrito y actualizo el contador
    const carrito = obtenerCarrito();
    actualizarContador(carrito);

    // accedo a los nodos
    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");

    // limpio los contenedores antes de renderizar
    contenedor.innerHTML = "";
    
    if (divAcciones) {
        divAcciones.innerHTML = ""; 
    }

    // muestro o limpio el resumen
    mostrarResumenCarrito(carrito); 

    // si no hay productos muestro un mensaje y salgo
    if (!carrito.length) {
        
        // creo el contenedor principal para aplicar fondo y sombra
        const mensajeContenedor = document.createElement("div");
        mensajeContenedor.classList.add("mensaje-carrito-vacio-contenedor");

        // creo el mensaje de texto (la parte roja)
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "No hay productos en el carrito";
        
        // creo el boton de "ver productos"
        const btnVerProductos = document.createElement("a");
        btnVerProductos.classList.add("btn");
        btnVerProductos.href = "../index.html"; 
        btnVerProductos.textContent = "Ver productos";

        // adjunto al contenedor
        mensajeContenedor.appendChild(mensaje);
        mensajeContenedor.appendChild(btnVerProductos);

        // adjunto el contenedor principal al DOM
        contenedor.appendChild(mensajeContenedor);
        
        
        return; // salgo para no renderizar productos
    }

    // si hay productos los renderizo
    // el forEach me da el indice del producto
    carrito.forEach((producto, indice) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        // contenedor para la imagen
        const img = document.createElement("img");
        img.src = `../${producto.img}`;
        img.alt = producto.nombre;
        
        // contenedor para titulo y detalles (producto-detalles)
        const productoDetalles = document.createElement("div");
        productoDetalles.classList.add("producto-detalles");
        
        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;
        
        // cntenedor para acciones y precio (contenedor-acciones-precio)
        const contenedorAccionesPrecio = document.createElement("div");
        contenedorAccionesPrecio.classList.add("contenedor-acciones-precio");
        
        // contenedor para el precio unitario, subtotal y cantidad (info-precio y control-cantidad)
        const precioUnitario = document.createElement("p");
        precioUnitario.classList.add("precio-unitario");
        precioUnitario.innerHTML = `Precio Unitario: <span>USD ${producto.precio.toFixed(2)}</span>`;


        // creacion del control de cantidad
        const controlCantidad = document.createElement("div");
        controlCantidad.classList.add("control-cantidad");
        
        const botonRestar = document.createElement("button");
        botonRestar.textContent = "-";
        botonRestar.classList.add("btn-cantidad");
        botonRestar.addEventListener("click", () => {
            decrementarCantidad(indice);
            renderizarCarrito();
        });

        const spanCantidad = document.createElement("span");
        spanCantidad.textContent = producto.cantidad;
        spanCantidad.classList.add("cantidad-actual");
        
        const botonSumar = document.createElement("button");
        botonSumar.textContent = "+";
        botonSumar.classList.add("btn-cantidad");
        botonSumar.addEventListener("click", () => {
            incrementarCantidad(indice);
            renderizarCarrito();
        });

        controlCantidad.appendChild(botonRestar);
        controlCantidad.appendChild(spanCantidad);
        controlCantidad.appendChild(botonSumar);
        
        // contenedor para el subtotal
        const infoPrecio = document.createElement("div");
        infoPrecio.classList.add("info-precio");
        infoPrecio.innerHTML = `
            ${precioUnitario.outerHTML}
            <p>Subtotal: <span>USD ${(producto.precio * producto.cantidad).toFixed(2)}</span></p>
        `;
        
        

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn");
        btnEliminar.classList.add("btn-eliminar-carrito");

        // uso el indice para eliminar el producto
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            eliminarProducto(indice);
            // volver a renderizar para actualizar la vista
            renderizarCarrito();
        });
        
       
        
        // titulo al contenedor de detalles
        productoDetalles.appendChild(titulo);
        
        // coloco la info de precio/subtotal y el control de cantidad en el contenedor de acciones
        contenedorAccionesPrecio.appendChild(infoPrecio);
        contenedorAccionesPrecio.appendChild(controlCantidad);

        // añado el contenedor de acciones al de detalles
        productoDetalles.appendChild(contenedorAccionesPrecio);


        //  armo la tarjeta final
        tarjeta.appendChild(img);
        tarjeta.appendChild(productoDetalles); 
        tarjeta.appendChild(btnEliminar);

        contenedor.appendChild(tarjeta);
    });

    
};

document.addEventListener("DOMContentLoaded", renderizarCarrito);