import { useState } from 'react';
import styles from './Admin.module.css';
import { useProductos } from '../../context/ProductosContext';
import Toast from '../../components/Toast';

export default function Admin() {
  const { productos, agregarProducto, eliminarProducto, actualizarProducto } = useProductos();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: ''
  });
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState(null);
  const [toast, setToast] = useState(null);

  const handleAbrirFormulario = (producto = null) => {
    if (producto) {
      setProductoEditando(producto);
      setFormData(producto);
    } else {
      setProductoEditando(null);
      setFormData({ nombre: '', precio: '', descripcion: '', imagen: '' });
    }
    setMostrarFormulario(true);
  };

  const handleCerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
    setFormData({ nombre: '', precio: '', descripcion: '', imagen: '' });
    setMensajeError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.precio || !formData.descripcion) {
      setMensajeError('Por favor completa todos los campos');
      return;
    }

    try {
      setCargando(true);
      setMensajeError(null);

      if (productoEditando) {
        await actualizarProducto(productoEditando.id, {
          ...formData,
          precio: parseInt(formData.precio),
          id: productoEditando.id
        });
        setToast({ mensaje: 'Producto actualizado exitosamente', tipo: 'exito' });
      } else {
        const nuevoProducto = {
          nombre: formData.nombre,
          precio: parseInt(formData.precio),
          descripcion: formData.descripcion,
          imagen: formData.imagen || 'https://via.placeholder.com/200'
        };
        await agregarProducto(nuevoProducto);
        setToast({ mensaje: 'Producto creado exitosamente', tipo: 'exito' });
      }

      handleCerrarFormulario();
    } catch (error) {
      setToast({ mensaje: error.message || 'Error al guardar el producto', tipo: 'error' });
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        setCargando(true);
        setMensajeError(null);
        await eliminarProducto(id);
        setToast({ mensaje: 'Producto eliminado exitosamente', tipo: 'exito' });
      } catch (error) {
        setToast({ mensaje: error.message || 'Error al eliminar el producto', tipo: 'error' });
        console.error('Error:', error);
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
            <h2> Panel de Administración</h2>
            <button onClick={() => handleAbrirFormulario()} className={styles.btnNuevoProducto}>
              + Nuevo Producto
            </button>
          </div>

          <div className={styles.productosAdmin}>
            <h3>Gestión de Productos</h3>
            
            {productos.length === 0 ? (
              <p className={styles.sinProductos}>No hay productos. ¡Crea uno nuevo!</p>
            ) : (
              <table className={styles.tablaAdmin}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(producto => (
                    <tr key={producto.id}>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio.toLocaleString()}</td>
                      <td className={styles.tdDescripcion}>{producto.descripcion}</td>
                      <td>
                        <img src={producto.imagen} alt={producto.nombre} className={styles.imgPreview} />
                      </td>
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
        </div>
      </section>

      {mostrarFormulario && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{productoEditando ? 'Editar Producto' : 'Nuevo Producto'}</h3>
              <button onClick={handleCerrarFormulario} className={styles.btnCerrar}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className={styles.formularioAdmin}>
              {mensajeError && (
                <div className={styles.errorMessage}>
                  {mensajeError}
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre del producto"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="precio">Precio</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder="Precio en pesos"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  placeholder="Descripción del producto"
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="imagen">URL de Imagen</label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={formData.imagen}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.modalButtons}>
                <button 
                  type="submit" 
                  className={styles.btnGuardar}
                  disabled={cargando}
                >
                  {cargando ? 'Guardando...' : 'Guardar Producto'}
                </button>
                <button 
                  type="button" 
                  onClick={handleCerrarFormulario} 
                  className={styles.btnCancelar}
                  disabled={cargando}
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