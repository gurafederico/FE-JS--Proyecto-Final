import {
    guardarCarrito,
    obtenerCarrito,
    vaciarCarritoStorage,
} from "./storage.js";

import { actualizarContador, mostrarMensaje } from "./ui.js";

/* agrego un producto o subo la cantidad si ya esta */
export const agregarAlCarrito = (nuevoProducto) => {
    const carrito = obtenerCarrito();

    // busco si el producto ya existe por su id
    const productoExistente = carrito.find(
        (producto) => producto.id === nuevoProducto.id
    );

    if (productoExistente) {
        // si existe, subo la cantidad
        productoExistente.cantidad += 1;
    } else {
        // si no existe, lo agrego con cantidad inicial de 1
        const productoConCantidad = {
            ...nuevoProducto, // copio propiedades
            cantidad: 1,      // añado cantidad
        };
        carrito.push(productoConCantidad);
    }

    // guardo el carrito y actualizo la vista
    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje("producto agregado al carrito");
};

// funcion para bajar la cantidad.
// si llega a 1, y cliqueo en simbolo - , lo borro

export const decrementarCantidad = (indice) => {
    const carrito = obtenerCarrito();
    const producto = carrito[indice];

    if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1;
        guardarCarrito(carrito);
        actualizarContador(carrito);
    } else if (producto && producto.cantidad === 1) {
        // si solo queda 1, lo elimino
        eliminarProducto(indice); 
    }
};

// funcion para subir la cantidad.

export const incrementarCantidad = (indice) => {
    const carrito = obtenerCarrito();
    const producto = carrito[indice];

    if (producto) {
        producto.cantidad += 1;
        guardarCarrito(carrito);
        actualizarContador(carrito);
    }
};

// funcion para eliminar un producto completo.

export const eliminarProducto = (indice) => {
    const carrito = obtenerCarrito();
    carrito.splice(indice, 1); // uso splice para eliminar por indice

    guardarCarrito(carrito);
    actualizarContador(carrito);
    mostrarMensaje("producto eliminado");
};

// funcion para vaciar todo el carrito.

export const vaciarCarrito = () => {
    vaciarCarritoStorage(); // elimino del storage
    actualizarContador([]); // pongo el contador en cero
    mostrarMensaje("carrito vaciado");
};