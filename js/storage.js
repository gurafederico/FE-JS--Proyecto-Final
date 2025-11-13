const KEY = "carrito";

export const guardarCarrito = (carrito) => {
  // convierto a json antes de guardar
  localStorage.setItem(KEY, JSON.stringify(carrito));
};

export const obtenerCarrito = () => {
  // obtengo el carrito y lo convierto a js, o devuelvo un array vacio
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const vaciarCarritoStorage = () => {
  // borro la clave del carrito del localstorage
  localStorage.removeItem(KEY);
};