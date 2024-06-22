import {
  listaCards,
  enviarProducto,
  deleteProduct,
} from "../services/dataFetch.js";

const lista = document.querySelector("[data-lista]");

function crearCard(imagen, nombre, precio, id) {
  const productos = document.createElement("li");
  productos.className = "card border";
  productos.innerHTML = `
        <img class="image__producto border" src="${imagen}" alt="Imagen de ${nombre}" />
        <div class="card-container--info">
            <p class="nombre__producto">${nombre}</p>
            <div class="card-container--value">
            <p class="value">$ ${precio}</p>
            <button class="btn_delete" data-id="${id}"><img class="btn_image" src="./image/icon/delete_24dp_FILL0_wght400_GRAD0_opsz24.svg" alt="Eliminar producto"></button>
            </div>
        </div>`;

  const deleteButton = productos.querySelector(".btn_delete");

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    const productId = event.currentTarget.getAttribute("data-id");
    deleteProduct(productId)
      .then(() => {
        productos.remove();
      })
      .catch((error) => console.log(error));
  });

  return productos;
}

async function listarCards() {
  try {
    const listaAPI = await listaCards();
    listaAPI.forEach((producto) =>
      lista.appendChild(
        crearCard(
          producto.imagen,
          producto.nombre,
          producto.precio,
          producto.id
        )
      )
    );
  } catch (error) {
    console.error("Error al listar las tarjetas: ", error);
  }
}

const formulario = document.querySelector("[data-formulario]");

async function crearProducto(evento) {
  evento.preventDefault();

  const nombre = document.querySelector("[data-nombre]").value;
  const precio = document.querySelector("[data-precio]").value;
  const imagen = document.querySelector("[data-imagen]").value;

  try {
    await enviarProducto(nombre, precio, imagen);

    alert("Producto creado exitosamente");
  } catch (error) {
    console.error("Error al crear el producto: ", error);
    alert("Hubo un error al crear el producto");
  }
}

formulario.addEventListener("submit", (evento) => crearProducto(evento));
listarCards();
