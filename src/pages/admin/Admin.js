import { useState, useEffect } from "react";
import styles from "./Admin.module.css";
import { useProductos } from "../../context/ProductosContext";
import { pedidoService } from "../../services/pedidoService";
import Toast from "../../components/Toast";

export default function Admin() {
  const { productos, agregarProducto, eliminarProducto, actualizarProducto } =
    useProductos();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
  });

  const [pedidos, setPedidos] = useState([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(true);

  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const data = await pedidoService.obtenerTodos();
      const ordenados = data.sort(
        (a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)
      );
      setPedidos(ordenados);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
      setToast({ mensaje: "Error al cargar pedidos", tipo: "error" });
    } finally {
      setCargandoPedidos(false);
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await pedidoService.actualizarEstado(id, nuevoEstado);
      setToast({ mensaje: "Estado actualizado", tipo: "exito" });
      cargarPedidos();
    } catch (error) {
      setToast({ mensaje: "Error al actualizar estado", tipo: "error" });
    }
  };

  const handleAbrirFormulario = (producto = null) => {
    if (producto) {
      setProductoEditando(producto);
      setFormData(producto);
    } else {
      setProductoEditando(null);
      setFormData({ nombre: "", precio: "", descripcion: "", imagen: "" });
    }
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
    setFormData({ nombre: "", precio: "", descripcion: "", imagen: "" });
    setMensajeError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.precio || !formData.descripcion) {
      setMensajeError("Por favor completa todos los campos");
      return;
    }
    try {
      setCargando(true);
      if (productoEditando) {
        await actualizarProducto(productoEditando.id, {
          ...formData,
          precio: parseInt(formData.precio),
          id: productoEditando.id,
        });
        setToast({
          mensaje: "Producto actualizado exitosamente",
          tipo: "exito",
        });
      } else {
        const nuevoProducto = {
          nombre: formData.nombre,
          precio: parseInt(formData.precio),
          descripcion: formData.descripcion,
          imagen: formData.imagen || "https://via.placeholder.com/200",
        };
        await agregarProducto(nuevoProducto);
        setToast({ mensaje: "Producto creado exitosamente", tipo: "exito" });
      }
      handleCerrarFormulario();
    } catch (error) {
      setToast({ mensaje: error.message || "Error al guardar", tipo: "error" });
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      try {
        setCargando(true);
        await eliminarProducto(id);
        setToast({ mensaje: "Producto eliminado", tipo: "exito" });
      } catch (error) {
        setToast({ mensaje: "Error al eliminar", tipo: "error" });
      } finally {
        setCargando(false);
      }
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.adminSection}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>⚡ Panel de Control</h2>
            <button
              onClick={() => handleAbrirFormulario()}
              className={styles.btnNuevoProducto}
            >
              + Nuevo Producto
            </button>
          </div>

          <div
            className={styles.productosAdmin}
            style={{ marginBottom: "40px" }}
          >
            <h3>📦 Inventario ({productos.length})</h3>

            {productos.length === 0 ? (
              <p className={styles.sinProductos}>No hay productos.</p>
            ) : (
              <table className={styles.tablaAdmin}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toLocaleString()}</td>
                      <td style={{ color: "#28a745" }}>En Stock</td>
                      <td className={styles.acciones}>
                        <button
                          onClick={() => handleAbrirFormulario(producto)}
                          className={styles.btnEditar}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(producto.id)}
                          className={styles.btnEliminarAdmin}
                          disabled={cargando}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className={styles.productosAdmin}>
            <h3>🛒 Últimas Ventas ({pedidos.length})</h3>

            {cargandoPedidos ? (
              <p className={styles.sinProductos}>Cargando pedidos...</p>
            ) : pedidos.length === 0 ? (
              <p className={styles.sinProductos}>
                Aún no hay ventas registradas.
              </p>
            ) : (
              <table className={styles.tablaAdmin}>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>
                        {new Date(pedido.fechaCreacion).toLocaleDateString()}
                      </td>
                      <td>
                        <div style={{ fontSize: "12px", color: "#fff" }}>
                          {pedido.nombre}
                        </div>
                        <div style={{ fontSize: "11px" }}>{pedido.email}</div>
                      </td>
                      <td style={{ color: "#3b8cc9", fontWeight: "bold" }}>
                        ${pedido.total?.toLocaleString()}
                      </td>
                      <td>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            backgroundColor:
                              pedido.estado === "pagado"
                                ? "rgba(40, 167, 69, 0.2)"
                                : pedido.estado === "enviado"
                                ? "rgba(59, 140, 201, 0.2)"
                                : pedido.estado === "entregado"
                                ? "rgba(255, 193, 7, 0.2)"
                                : "#2a2e3e",
                            color:
                              pedido.estado === "pagado"
                                ? "#28a745"
                                : pedido.estado === "enviado"
                                ? "#3b8cc9"
                                : pedido.estado === "entregado"
                                ? "#ffc107"
                                : "#a0a6c1",
                            border: `1px solid ${
                              pedido.estado === "pagado"
                                ? "#28a745"
                                : pedido.estado === "enviado"
                                ? "#3b8cc9"
                                : pedido.estado === "entregado"
                                ? "#ffc107"
                                : "#a0a6c1"
                            }`,
                          }}
                        >
                          {pedido.estado.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <select
                          value={pedido.estado}
                          onChange={(e) =>
                            handleCambiarEstado(pedido.id, e.target.value)
                          }
                          style={{
                            padding: "5px",
                            borderRadius: "4px",
                            backgroundColor: "#0f111a",
                            color: "#fff",
                            border: "1px solid #3a3f5c",
                            fontSize: "12px",
                          }}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="pagado">Pagado</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {mostrarFormulario && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{productoEditando ? "Editar Producto" : "Nuevo Producto"}</h3>
              <button
                onClick={handleCerrarFormulario}
                className={styles.btnCerrar}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.formularioAdmin}>
              {mensajeError && (
                <div className={styles.errorMessage}>{mensajeError}</div>
              )}
              <div className={styles.formGroup}>
                <label>Nombre</label>
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>URL Imagen</label>
                <input
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <div className={styles.modalButtons}>
                <button
                  type="submit"
                  className={styles.btnGuardar}
                  disabled={cargando}
                >
                  {cargando ? "..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={handleCerrarFormulario}
                  className={styles.btnCancelar}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {toast && (
        <Toast
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
