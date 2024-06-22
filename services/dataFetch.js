export async function listaCards() {
  try {
    const conexion = await fetch("http://localhost:3001/productos");
    if (!conexion.ok) {
      throw new Error(`HTTP error! status: ${conexion.status}`);
    }
    const conexionConvertida = await conexion.json();
    return conexionConvertida;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
}

export async function enviarProducto(nombre, precio, imagen) {
  try {
    const conexion = await fetch("http://localhost:3001/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, precio, imagen }),
    });

    if (!conexion.ok) {
      throw new Error(`HTTP error! status: ${conexion.status}`);
    }

    const conexionConvertida = await conexion.json();
    return conexionConvertida;
  } catch (error) {
    console.error("Error sending data: ", error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:3001/productos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    console.log("Producto eliminado exitosamente");
  } catch (error) {
    console.error("Hubo un error al intentar eliminar el producto:", error);
  }
}
