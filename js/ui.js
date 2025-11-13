// funcion para actualizar el numero de articulos en el icono del carrito.
export const actualizarContador = (carrito) => {
  // busco el elemento donde muestro el contador en el html.
  const contador = document.getElementById("contador-carrito");

  // compruebo que el elemento exista
  if (contador) {
    // asigno la longitud del carrito (total de productos) al texto.
    contador.textContent = carrito.length;
  }
};

// funcion para mostrar un mensaje simple
export const mostrarMensaje = (texto) => {
  // muestro el texto en una alerta del navegador.
  alert(texto);
};